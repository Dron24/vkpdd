import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>ПДД Учебник</PanelHeader>

      {fetchedUser && (
        <Group header={<Header mode="secondary">Добро пожаловать</Header>}>
          <Cell
            before={photo_200 && <Avatar src={photo_200} />}
            subtitle={city?.title}
          >
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="primary">Разделы</Header>}>
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
            mode="secondary"
            disabled
          >
            📚 Теория (скоро)
          </Button>
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
