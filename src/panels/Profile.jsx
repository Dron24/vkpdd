import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Panel,
  PanelHeader,
  Group,
  Header,
  Div,
  Avatar,
  Text,
  Spacing,
  SimpleCell,
  Button,
  Snackbar
} from '@vkontakte/vkui';
import { Icon28CheckCircleOutline, Icon28CancelOutline } from '@vkontakte/icons';

export const Profile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const appLink = `https://vk.com/app${import.meta.env.VITE_VK_APP_ID}`;
  const isDesktop = window.innerWidth > 768;

  useEffect(() => {
    async function fetchUser() {
      try {
        const userInfo = await bridge.send('VKWebAppGetUserInfo');
        setUser(userInfo);
      } catch (e) {
        console.error('Не удалось получить данные пользователя:', e);
      }
    }

    fetchUser();
  }, []);

  const openSnackbar = (message, success = true) => {
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={
          success
            ? <Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />
            : <Icon28CancelOutline fill="var(--vkui--color_icon_negative)" />
        }
      >
        {message}
      </Snackbar>
    );
  };

  const handleShare = async () => {
    if (isDesktop) {
      try {
        await navigator.clipboard.writeText(appLink);
        openSnackbar('Ссылка скопирована в буфер обмена!');
      } catch (err) {
        console.error('Ошибка копирования ссылки:', err);
        openSnackbar('Не удалось скопировать ссылку.', false);
      }
    } else {
      try {
        await bridge.send('VKWebAppShare', { link: appLink });
      } catch (e) {
        console.warn('Ошибка VKWebAppShare:', e);
        openSnackbar('Не удалось поделиться ссылкой.', false);
      }
    }
  };

  if (!user) {
    return (
      <Panel id={id}>
        <PanelHeader>Профиль</PanelHeader>
        <Div>Загрузка...</Div>
      </Panel>
    );
  }

  const fullName = `${user.first_name} ${user.last_name}`;
  const city = user.city?.title || 'Не указано';
  const bdate = user.bdate || 'Не указано';
  const sex = user.sex === 1 ? 'Женский' : user.sex === 2 ? 'Мужской' : 'Не указан';
  const userId = user.id;

  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>

      <Group>
        <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar size={96} src={user.photo_200} />
          <Spacing size={12} />
          <Text weight="2" style={{ fontSize: 20 }}>{fullName}</Text>
          <Text style={{ color: 'var(--vkui--color_text_secondary)' }}>{city}</Text>
        </Div>
      </Group>

      <Group header={<Header mode="secondary">Информация о пользователе</Header>}>
        <SimpleCell disabled>Пол: {sex}</SimpleCell>
        <SimpleCell disabled>Дата рождения: {bdate}</SimpleCell>
        <SimpleCell disabled>ID пользователя: {userId}</SimpleCell>
        <SimpleCell disabled>Город: {city}</SimpleCell>
      </Group>

      <Group>
        <Div>
          <Button size="l" stretched mode="primary" onClick={handleShare}>
            Поделиться приложением
          </Button>
        </Div>
      </Group>

      {snackbar}
    </Panel>
  );
};
