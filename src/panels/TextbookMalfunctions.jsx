import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const TextbookMalfunctions = ({ id }) => {
  const navigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Перечень неисправностей</PanelHeader>
      <Group>
        <Div>Контент раздела Неисправности...</Div>
      </Group>
    </Panel>
  );
};