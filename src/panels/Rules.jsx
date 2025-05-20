import { Panel, PanelHeader, Group, Header, Div } from '@vkontakte/vkui';

export const Rules = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Правила</PanelHeader>
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
