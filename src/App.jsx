import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home, Onewayroad, Markup, Rules, Tests } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedUser={fetchedUser} />
          <Onewayroad id={DEFAULT_VIEW_PANELS.ONEWAYROAD} />
          <Markup id={DEFAULT_VIEW_PANELS.MARKUP} />
          <Rules id={DEFAULT_VIEW_PANELS.RULES} />
          <Tests id={DEFAULT_VIEW_PANELS.TESTS} />
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
