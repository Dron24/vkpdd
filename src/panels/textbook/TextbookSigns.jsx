import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const TextbookSigns = ({ id }) => {
  const navigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Дорожные знаки</PanelHeader>
      <Group>
        <Div>Контент раздела Знаки...</Div>
      </Group>
    </Panel>
  );
};
