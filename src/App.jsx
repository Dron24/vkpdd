import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  View,
  SplitLayout,
  SplitCol,
  ScreenSpinner,
  usePlatform,
  AppRoot,
} from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import {
  Tickets_pdd,
  Textbook,
  TextbookViewer,
  TextbookSubsection,
  Tests,
  Progress,
  Profile,
} from './panels';

import { DEFAULT_VIEW, DEFAULT_VIEW_PANELS } from './routes';
import AppTabbar from './components/AppTabbar';
import RedirectToHome from './panels/RedirectToHome';

const TABBAR_HEIGHT = 56;

export const App = () => {
  const loc = useActiveVkuiLocation() || {};
  const activeView = loc.view || DEFAULT_VIEW;
  const activePanel = loc.panel || DEFAULT_VIEW_PANELS.ROOT;

  const platform = usePlatform();
  const isDev = process.env.NODE_ENV === 'development';

  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(isDev ? null : <ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
      } catch (error) {
        console.error('VK Bridge error:', error);
      } finally {
        if (!isDev) setPopout(null);
      }
    }

    fetchData();
  }, []);

  return (
    <AppRoot>
      <SplitLayout popout={popout} style={{ height: '100vh' }}>
        <SplitCol style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              paddingBottom: `calc(${TABBAR_HEIGHT}px + env(safe-area-inset-bottom, 0px))`,
            }}
          >
            <View nav={activeView} activePanel={activePanel}>
              <RedirectToHome id={DEFAULT_VIEW_PANELS.ROOT} />
              <Profile id={DEFAULT_VIEW_PANELS.PROFILE} fetchedUser={fetchedUser} />
              <Tickets_pdd id={DEFAULT_VIEW_PANELS.TICKETS_PDD} />
              <Textbook id={DEFAULT_VIEW_PANELS.TEXTBOOK} />
              <TextbookViewer id={DEFAULT_VIEW_PANELS.TEXTBOOK_VIEWER} />
              <TextbookSubsection id={DEFAULT_VIEW_PANELS.TEXTBOOK_SUBSECTION} />
              <Tests id={DEFAULT_VIEW_PANELS.TESTS} />
              <Progress id={DEFAULT_VIEW_PANELS.PROGRESS} />
            </View>
          </div>

          <div
            style={{
              height: `${TABBAR_HEIGHT}px`,
              backgroundColor: 'var(--vkui--color_background_content)',
              borderTop: '1px solid var(--vkui--color_separator_primary)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <AppTabbar />
          </div>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};
