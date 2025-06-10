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
  ModalCard,
  usePlatform,
  useAdaptivityConditionalRender,
  ModalRoot,
  ModalPage,
  ModalPageHeader
} from '@vkontakte/vkui';
import { Icon28ShareOutline, Icon28CheckCircleOutline, Icon28CancelOutline } from '@vkontakte/icons';

export const Profile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const platform = usePlatform();

  const appLink = `https://vk.com/app${import.meta.env.VITE_VK_APP_ID}`;

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

  const handleShare = async () => {
    const isDesktop = platform === 'desktop';

    if (isDesktop) {
      // Показать модалку с ручным копированием
      setActiveModal('shareLink');
    } else {
      // На мобильных работает нативный share
      try {
        await bridge.send('VKWebAppShare', {
          link: appLink
        });
      } catch (e) {
        console.error('Ошибка при попытке поделиться:', e);
      }
    }
  };

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <ModalCard
        id="shareLink"
        onClose={() => setActiveModal(null)}
        icon={<Icon28ShareOutline />}
        header="Поделиться приложением"
        subheader="Скопируйте и отправьте ссылку вручную:"
        actions={[
          {
            title: 'Закрыть',
            mode: 'cancel',
            action: () => setActiveModal(null),
          },
        ]}
      >
        <Div
          style={{
            background: '#f5f5f5',
            padding: 10,
            borderRadius: 8,
            wordBreak: 'break-all',
            textAlign: 'center',
            userSelect: 'all',
          }}
        >
          {appLink}
        </Div>
      </ModalCard>
    </ModalRoot>
  );

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
    <Panel id={id} modal={modal}>
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
            Поделиться с другом
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
