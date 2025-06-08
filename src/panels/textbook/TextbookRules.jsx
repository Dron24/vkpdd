import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const TextbookRules = ({ id }) => {
  const navigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Правила дорожного движения</PanelHeader>
      <Group>
        <Div>Контент раздела ПДД...</Div>
      </Group>
    </Panel>
  );
};