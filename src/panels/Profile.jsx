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
} from '@vkontakte/vkui';

export const Profile = ({ id }) => {
  const [user, setUser] = useState(null);

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
    </Panel>
  );
};
