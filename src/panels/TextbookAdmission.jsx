import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const TextbookAdmission = ({ id }) => {
  const navigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Допуск к эксплуатации</PanelHeader>
      <Group>
        <Div>Контент раздела Допуск...</Div>
      </Group>
    </Panel>
  );
};