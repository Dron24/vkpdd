import { Panel, PanelHeader, PanelHeaderBack, Group, Header, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Profile = ({ id }) => {
  const navigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        Мой профиль
      </PanelHeader>
      <Group header={<Header mode="primary">Информация о пользователе</Header>}>
        <Div>
          Здесь будет отображаться ваша информация из ВКонтакте, настройки и другой персонализированный контент.
        </Div>
      </Group>
    </Panel>
  );
};
