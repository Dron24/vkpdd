import { Panel, PanelHeader, PanelHeaderBack, Group, Header, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Tickets_pdd = ({ id }) => {
  const navigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Разметка</PanelHeader>
      <Group header={<Header mode="primary">Дорожная разметка</Header>}>
        <Div>
          Здесь будет информация о видах дорожной разметки, их значении и применении.
          <br />
          Примеры, иллюстрации и пояснения скоро появятся!
        </Div>
      </Group>
    </Panel>
  );
};
