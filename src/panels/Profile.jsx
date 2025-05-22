import { Panel, PanelHeader, Group, Header, Div } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

export const Profile = ({ id }) => {
  const [userName, setUserName] = useState('гость');

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUserName(user.first_name);
      } catch (error) {
        console.warn('Не удалось получить данные пользователя:', error);
      }
    }

    fetchUser();
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Привет, {userName}</PanelHeader>
      <Group header={<Header mode="primary">Информация о пользователе</Header>}>
        <Div>
          Здесь будет отображаться ваша информация из ВКонтакте, настройки и другой персонализированный контент.
        </Div>
      </Group>
    </Panel>
  );
};
