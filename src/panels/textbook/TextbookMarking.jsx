import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const TextbookMarking = ({ id }) => {
  const navigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Дорожная разметка</PanelHeader>
      <Group>
        <Div>Контент раздела Разметка...</Div>
      </Group>
    </Panel>
  );
};
