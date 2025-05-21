import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import {
  Icon28HomeOutline,
  Icon28ListOutline,
  Icon28BookOutline,
  Icon28CheckCircleOutline,
  Icon28GraphOutline,
  Icon28UserCircleOutline
} from '@vkontakte/icons';

import {
  useRouteNavigator,
  useActiveVkuiLocation
} from '@vkontakte/vk-mini-apps-router';

import { DEFAULT_VIEW_PANELS } from '../routes';

const AppTabbar = () => {
  const navigator = useRouteNavigator();
  const { panel } = useActiveVkuiLocation(); // Получаем текущую панель

  return (
    <Tabbar>
      <TabbarItem
        onClick={() => navigator.push(`/${DEFAULT_VIEW_PANELS.HOME}`)}
        text="Главная"
        aria-label="Главная"
        selected={panel === DEFAULT_VIEW_PANELS.HOME}
        className={panel === DEFAULT_VIEW_PANELS.HOME ? 'text-green-700' : ''}
      >
        <Icon28HomeOutline />
      </TabbarItem>

      <TabbarItem
        onClick={() => navigator.push(`/${DEFAULT_VIEW_PANELS.MARKUP}`)}
        text="Разметка"
        aria-label="Разметка"
        selected={panel === DEFAULT_VIEW_PANELS.MARKUP}
        className={panel === DEFAULT_VIEW_PANELS.MARKUP ? 'text-green-700' : ''}
      >
        <Icon28ListOutline />
      </TabbarItem>

      <TabbarItem
        onClick={() => navigator.push(`/${DEFAULT_VIEW_PANELS.RULES}`)}
        text="ПДД"
        aria-label="Правила дорожного движения"
        selected={panel === DEFAULT_VIEW_PANELS.RULES}
        className={panel === DEFAULT_VIEW_PANELS.RULES ? 'text-green-700' : ''}
      >
        <Icon28BookOutline />
      </TabbarItem>

      <TabbarItem
        onClick={() => navigator.push(`/${DEFAULT_VIEW_PANELS.TESTS}`)}
        text="Тесты"
        aria-label="Тесты"
        selected={panel === DEFAULT_VIEW_PANELS.TESTS}
        className={panel === DEFAULT_VIEW_PANELS.TESTS ? 'text-green-700' : ''}
      >
        <Icon28CheckCircleOutline />
      </TabbarItem>

      <TabbarItem
        onClick={() => navigator.push(`/${DEFAULT_VIEW_PANELS.PROGRESS}`)}
        text="Прогресс"
        aria-label="Мой прогресс"
        selected={panel === DEFAULT_VIEW_PANELS.PROGRESS}
        className={panel === DEFAULT_VIEW_PANELS.PROGRESS ? 'text-green-700' : ''}
      >
        <Icon28GraphOutline />
      </TabbarItem>

      <TabbarItem
        onClick={() => navigator.push(`/${DEFAULT_VIEW_PANELS.PROFILE}`)}
        text="Профиль"
        aria-label="Мой профиль"
        selected={panel === DEFAULT_VIEW_PANELS.PROFILE}
        className={panel === DEFAULT_VIEW_PANELS.PROFILE ? 'text-green-700' : ''}
      >
        <Icon28UserCircleOutline />
      </TabbarItem>
    </Tabbar>
  );
};

export default AppTabbar;
