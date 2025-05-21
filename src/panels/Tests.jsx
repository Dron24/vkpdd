import { Panel, PanelHeader, PanelHeaderBack, Group, Header, Div, Button } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


export const Tests = ({ id }) => {
  const navigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Тесты</PanelHeader>
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
};