import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import RoadImage from '../assets/onewayroad.png';

export const Persik = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Persik
      </PanelHeader>
      <Placeholder>
        <img width={230} src={RoadImage} alt="one-way_road" />
      </Placeholder>
    </Panel>
  );
};

Persik.propTypes = {
  id: PropTypes.string.isRequired,
};
