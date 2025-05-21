import { Panel, PanelHeader, PanelHeaderBack, Group, Header, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


export const Progress = ({ id }) => {
  const navigator = useRouteNavigator();
  
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        Мой прогресс
      </PanelHeader>
      <Group header={<Header mode="primary">Ваш прогресс</Header>}>
        <Div>
          Здесь будет отображаться статистика прохождения тестов, темы, которые вы уже изучили, и ваш текущий уровень.
        </Div>
      </Group>
    </Panel>
  );
};
