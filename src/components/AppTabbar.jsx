import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import {
  Icon28BookOutline,
  Icon28TicketOutline,
  Icon28CheckCircleOutline,
  Icon28GraphOutline,
  Icon28UserCircleOutline
} from '@vkontakte/icons';
import {
  useRouteNavigator,
  useActiveVkuiLocation,
} from '@vkontakte/vk-mini-apps-router';

import { DEFAULT_VIEW_PANELS } from '../routes';

const AppTabbar = () => {
  const navigator = useRouteNavigator();
  const { panel } = useActiveVkuiLocation();

  const tabs = [
    { id: DEFAULT_VIEW_PANELS.PROFILE, icon: <Icon28UserCircleOutline />, text: 'Профиль' },
    { id: DEFAULT_VIEW_PANELS.PROGRESS, icon: <Icon28GraphOutline />, text: 'Статистика' },
    { id: DEFAULT_VIEW_PANELS.TEXTBOOK, icon: <Icon28BookOutline />, text: 'Учебник' },
    { id: DEFAULT_VIEW_PANELS.TICKETS_PDD, icon: <Icon28TicketOutline />, text: 'Билеты' },
    { id: DEFAULT_VIEW_PANELS.TESTS, icon: <Icon28CheckCircleOutline />, text: 'Экзамен' },
  ];

  return (
    <Tabbar>
      {tabs.map(({ id, icon, text }) => {
        const isActive = panel === id;
        const color = isActive ? '#00FF00' : 'var(--vkui--color_icon_secondary)';

        return (
          <TabbarItem
            key={id}
            onClick={() => {
              if (!isActive) navigator.push(`/${id}`);
            }}
            selected={isActive}
            aria-label={text}
            text={
              <span
                style={{
                  color,
                  transition: 'color 0.3s ease',
                }}
              >
                {text}
              </span>
            }
          >
            {React.cloneElement(icon, {
              color,
              style: {
                transition: 'transform 0.3s ease',
                transform: isActive ? 'scale(1.3)' : 'scale(1)',
              },
            })}
          </TabbarItem>
        );
      })}
    </Tabbar>
  );
};

export default AppTabbar;
