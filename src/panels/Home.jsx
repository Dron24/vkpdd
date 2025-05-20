import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  Spacing,
  Separator,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';

export const Home = ({ id, fetchedUser }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>ПДД Учебник</PanelHeader>

      {fetchedUser && (
        <Group header={<Header mode="secondary">Добро пожаловать</Header>}>
          <Cell
            before={
              fetchedUser.photo_200 && <Avatar src={fetchedUser.photo_200} />
            }
            subtitle={fetchedUser.city?.title}
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="primary">Разделы ПДД</Header>}>
        <Div>
          <Button
            stretched
            size="l"
            mode="primary"
            onClick={() => routeNavigator.push('onewayroad')}
          >
            🚧 Дорожные знаки
          </Button>
        </Div>

        <Div>
          <Button
            stretched
            size="l"
            mode="primary"
            onClick={() => routeNavigator.push('markup')}
          >
            🛣️ Дорожная разметка
          </Button>
        </Div>

        <Div>
          <Button
            stretched
            size="l"
            mode="primary"
            onClick={() => routeNavigator.push('rules')}
          >
            📘 Общие правила
          </Button>
        </Div>

        <Div>
          <Button
            stretched
            size="l"
            mode="primary"
            onClick={() => routeNavigator.push('tests')}
          >
            🧠 Пройти тест
          </Button>
        </Div>
      </Group>

      <Spacing size={16} />
      <Separator />
      <Spacing size={8} />

      <Group header={<Header mode="secondary">О приложении</Header>}>
        <Div>
          Это учебное мини-приложение поможет вам изучить Правила дорожного движения, пройти тесты и подготовиться к экзамену.
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
