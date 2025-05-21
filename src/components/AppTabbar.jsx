import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import {
  Icon28HomeOutline,
  Icon28ListOutline,
  Icon28BookOutline,
  Icon28CheckCircleOutline,
  Icon28GraphOutline,
  Icon28UserCircleOutline,
} from '@vkontakte/icons';

import {
  useRouteNavigator,
  useActiveVkuiLocation,
} from '@vkontakte/vk-mini-apps-router';

import { DEFAULT_VIEW_PANELS } from '../routes';
import React from 'react';

const AppTabbar = () => {
  const navigator = useRouteNavigator();
  const { panel } = useActiveVkuiLocation(); // Получаем текущую панель

  const tabs = [
    {
      id: DEFAULT_VIEW_PANELS.HOME,
      icon: <Icon28HomeOutline />,
      text: 'Главная',
    },
    {
      id: DEFAULT_VIEW_PANELS.MARKUP,
      icon: <Icon28ListOutline />,
      text: 'Разметка',
    },
    {
      id: DEFAULT_VIEW_PANELS.RULES,
      icon: <Icon28BookOutline />,
      text: 'ПДД',
    },
    {
      id: DEFAULT_VIEW_PANELS.TESTS,
      icon: <Icon28CheckCircleOutline />,
      text: 'Тесты',
    },
    {
      id: DEFAULT_VIEW_PANELS.PROGRESS,
      icon: <Icon28GraphOutline />,
      text: 'Прогресс',
    },
    {
      id: DEFAULT_VIEW_PANELS.PROFILE,
      icon: <Icon28UserCircleOutline />,
      text: 'Профиль',
    },
  ];

  return (
    <Tabbar>
      {tabs.map(({ id, icon, text }) => {
        const isActive = panel === id;
        const color = isActive ? '#00FF00' : '#FFA500';

        return (
          <TabbarItem
            key={id}
            onClick={() => navigator.push(`/${id}`)}
            selected={isActive}
            text={<span style={{ color }}>{text}</span>}
            aria-label={text}
          >
            {React.cloneElement(icon, { color })}
          </TabbarItem>
        );
      })}
    </Tabbar>
  );
};

export default AppTabbar;
