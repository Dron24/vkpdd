import { Panel, PanelHeader, PanelHeaderBack, Group, Header, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Rules = ({ id }) => {
  const navigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        Правила
      </PanelHeader>
      <Group header={<Header mode="primary">Общие правила дорожного движения</Header>}>
        <Div>
          Здесь будет представлено содержание основных пунктов ПДД:
          <ul>
            <li>Общие обязанности водителей</li>
            <li>Пешеходы</li>
            <li>Маневрирование</li>
            <li>Ограничения скорости</li>
          </ul>
          Подробности появятся позже!
        </Div>
      </Group>
    </Panel>
  );
};
