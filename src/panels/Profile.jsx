import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Panel,
  PanelHeader,
  Group,
  Header,
  Div,
  Avatar,
  Cell,
  Button,
  Separator,
} from '@vkontakte/vkui';

import {
  IconPlaceOutline,
  IconUsers3Outline,
  IconUserCircleOutline,
  IconCakeOutline,
  IconUserStarOutline,
  IconShareOutline,
  IconUserAddOutline,
  IconDoorArrowRightOutline,
} from '@vkontakte/icons';

export const Profile = ({ id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userInfo = await bridge.send('VKWebAppGetUserInfo');
        setUser(userInfo);
      } catch (error) {
        console.warn('Не удалось получить данные пользователя:', error);
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return (
      <Panel id={id}>
        <PanelHeader>Загрузка...</PanelHeader>
        <Div>Подождите, идет загрузка данных пользователя...</Div>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader>Привет, {user.first_name}!</PanelHeader>
      <Group>
        <Div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <Avatar size={96} src={user.photo_200} alt={`${user.first_name} ${user.last_name}`} />
        </Div>

        <Group header={<Header mode="primary">Информация о пользователе</Header>}>
          <Cell
            before={<IconUserCircleOutline />}
            description={`ID: ${user.id}`}
          >
            Имя пользователя
          </Cell>
          <Cell
            before={<IconCakeOutline />}
          >
            День рождения: {user.bdate || 'Не указано'}
          </Cell>
          <Cell
            before={<IconPlaceOutline />}
          >
            Город: {user.city?.title || 'Не указан'}
          </Cell>
          <Cell
            before={<IconUsers3Outline />}
          >
            Друзья: {user.friends || 'Нет данных'}
          </Cell>
          <Cell
            before={<IconUserStarOutline />}
          >
            Статус: {user.status || 'Не указан'}
          </Cell>
        </Group>

        <Separator style={{ margin: '16px 0' }} />

        <Group header={<Header mode="primary">Действия</Header>}>
          <Button
            size="l"
            mode="secondary"
            before={<IconShareOutline />}
            stretched
            onClick={() => {
              bridge.send('VKWebAppShare', {
                link: 'https://vk.com/appYOUR_APP_ID',
              });
            }}
          >
            Поделиться приложением
          </Button>
          <Button
            size="l"
            mode="outline"
            before={<IconUserAddOutline />}
            stretched
            onClick={() => alert('Функция добавления друзей в разработке')}
          >
            Добавить друзей
          </Button>
          <Button
            size="l"
            mode="destructive"
            before={<IconDoorArrowRightOutline />}
            stretched
            onClick={() => alert('Здесь должна быть логика выхода из аккаунта')}
          >
            Выйти
          </Button>
        </Group>
      </Group>
    </Panel>
  );
};
