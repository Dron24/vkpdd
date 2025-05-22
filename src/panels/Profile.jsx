import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Panel,
  PanelHeader,
  Group,
  Header,
  Cell,
  Avatar,
  Div,
  Button,
  CardGrid,
  Card,
  Text,
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
  const city = user.city?.title || 'Город не указан';

  return (
    <Panel id={id}>
      <PanelHeader>Привет, {user.first_name}</PanelHeader>

      <Group>
        <Cell before={<Avatar size={96} src={user.photo_200} />}>
          <Text weight="semibold" style={{ fontSize: 20 }}>
            {fullName}
          </Text>
          <Text weight="regular" style={{ marginTop: 4 }}>
            {city}
          </Text>
        </Cell>
      </Group>

      <Group header={<Header mode="secondary">Статистика</Header>}>
        <CardGrid size="l" style={{ padding: 12 }}>
          <Card
            mode="shadow"
            style={{ padding: 12, textAlign: 'center' }}
          >
            <Text weight="semibold" style={{ fontSize: 18 }}>
              123
            </Text>
            <Text>Друзья</Text>
          </Card>
          <Card
            mode="shadow"
            style={{ padding: 12, textAlign: 'center' }}
          >
            <Text weight="semibold" style={{ fontSize: 18 }}>
              456
            </Text>
            <Text>Сообщения</Text>
          </Card>
        </CardGrid>
      </Group>

      <Div>
        <Button size="l" mode="secondary" onClick={() => bridge.send('VKWebAppClose')}>
          Выйти
        </Button>
      </Div>
    </Panel>
  );
};
