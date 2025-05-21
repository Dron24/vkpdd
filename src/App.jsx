import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home, Markup, Rules, Tests, Progress, Profile } from './panels';
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
          {/* 🔧 добавляем id, чтобы удовлетворить требования View */}
          <RedirectToHome id={DEFAULT_VIEW_PANELS.ROOT} />

          <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedUser={fetchedUser} />
          <Markup id={DEFAULT_VIEW_PANELS.MARKUP} />
          <Rules id={DEFAULT_VIEW_PANELS.RULES} />
          <Tests id={DEFAULT_VIEW_PANELS.TESTS} />
          <Progress id={DEFAULT_VIEW_PANELS.PROGRESS} />
          <Profile id={DEFAULT_VIEW_PANELS.PROFILE} />
        </View>
        <AppTabbar />
      </SplitCol>
    </SplitLayout>
  );
};
