import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Tickets_pdd, Textbook, Tests, Progress, Profile } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

import AppTabbar from './components/AppTabbar';
import RedirectToHome from './panels/RedirectToHome';

export const App = () => {
  const {
    view: activeView,
    panel: activePanel = DEFAULT_VIEW_PANELS.HOME,
  } = useActiveVkuiLocation();

  const isDev = process.env.NODE_ENV === 'development';

  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(isDev ? null : <ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
      } catch (error) {
        console.error('Ошибка получения данных VK Bridge:', error);
      } finally {
        if (!isDev) setPopout(null);
      }
    }

    fetchData();
  }, []);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View nav={activeView} activePanel={activePanel}>
          <RedirectToHome id={DEFAULT_VIEW_PANELS.ROOT} />
          <Profile id={DEFAULT_VIEW_PANELS.PROFILE} fetchedUser={fetchedUser} />
          <Tickets_pdd id={DEFAULT_VIEW_PANELS.TICKETS_PDD} />
          <Textbook id={DEFAULT_VIEW_PANELS.TEXTBOOK} />
          <Tests id={DEFAULT_VIEW_PANELS.TESTS} />
          <Progress id={DEFAULT_VIEW_PANELS.PROGRESS} />
        </View>
        <AppTabbar />
      </SplitCol>
    </SplitLayout>
  );
};
