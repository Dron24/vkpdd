import { Panel, PanelHeader, Group, Header, Div } from '@vkontakte/vkui';

export const Markup = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Разметка</PanelHeader>
    <Group header={<Header mode="primary">Дорожная разметка</Header>}>
      <Div>
        Здесь будет информация о видах дорожной разметки, их значении и применении.
        <br />
        Примеры, иллюстрации и пояснения скоро появятся!
      </Div>
    </Group>
  </Panel>
);
