import { Panel, PanelHeader, Group, Header, Div, Button } from '@vkontakte/vkui';

export const Tests = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Тесты</PanelHeader>
    <Group header={<Header mode="primary">Экзамен по ПДД</Header>}>
      <Div>
        Здесь вы сможете пройти тренировочные тесты по ПДД.
        <br />
        Функция скоро будет доступна!
      </Div>
      <Div>
        <Button stretched size="l" mode="primary" disabled>
          Начать тест
        </Button>
      </Div>
    </Group>
  </Panel>
);
