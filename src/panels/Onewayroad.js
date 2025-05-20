import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import RoadImage from '../assets/onewayroad.png';

export const Onewayroad = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Будущий Учебник ПДД
      </PanelHeader>
      <Placeholder>
        <img width={230} src={RoadImage} alt="one-way_road" />
      </Placeholder>
    </Panel>
  );
};

Onewayroad.propTypes = {
  id: PropTypes.string.isRequired,
};
