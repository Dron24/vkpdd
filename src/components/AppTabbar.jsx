import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { useRouteNavigator, useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import {
  BsPersonCircle,
  BsBook,
  BsClipboardCheck,
  BsPatchCheck,
} from 'react-icons/bs';
import { IoBarChartOutline } from 'react-icons/io5';

import { DEFAULT_VIEW_PANELS } from '../routes';

const ICON_SIZE = 26;

const AppTabbar = () => {
  const navigator = useRouteNavigator();
  const { panel } = useActiveVkuiLocation();

  const tabs = [
    { id: DEFAULT_VIEW_PANELS.PROFILE, icon: BsPersonCircle, text: 'Профиль' },
    { id: DEFAULT_VIEW_PANELS.PROGRESS, icon: IoBarChartOutline, text: 'Статистика' },
    { id: DEFAULT_VIEW_PANELS.TEXTBOOK, icon: BsBook, text: 'Учебник' },
    { id: DEFAULT_VIEW_PANELS.TICKETS_PDD, icon: BsClipboardCheck, text: 'Билеты' },
    { id: DEFAULT_VIEW_PANELS.TESTS, icon: BsPatchCheck, text: 'Экзамен' },
  ];

  return (
    <Tabbar>
      {tabs.map(({ id, icon: IconComponent, text }) => {
        const isActive = typeof panel === 'string' && panel.startsWith(id);
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: ICON_SIZE + 6,
                height: ICON_SIZE + 6,
              }}
            >
              <IconComponent
                color={color}
                size={ICON_SIZE}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: isActive ? 'scale(1.25)' : 'scale(1)',
                }}
              />
            </div>
          </TabbarItem>
        );
      })}
    </Tabbar>
  );
};

export default AppTabbar;
