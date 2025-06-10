import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { useRouteNavigator, useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { BsPersonVcard, BsSpeedometer2, BsJournalText, BsTicketPerforated, BsRocketTakeoff } from "react-icons/bs";

import { DEFAULT_VIEW_PANELS } from '../routes';

const AppTabbar = () => {
  const navigator = useRouteNavigator();
  const { panel } = useActiveVkuiLocation();

  const tabs = [
    { id: DEFAULT_VIEW_PANELS.PROFILE, icon: <BsPersonVcard />, text: 'Профиль' },
    { id: DEFAULT_VIEW_PANELS.PROGRESS, icon: <BsSpeedometer2 />, text: 'Статистика' },
    { id: DEFAULT_VIEW_PANELS.TEXTBOOK, icon: <BsJournalText />, text: 'Учебник' },
    { id: DEFAULT_VIEW_PANELS.TICKETS_PDD, icon: <BsTicketPerforated />, text: 'Билеты' },
    { id: DEFAULT_VIEW_PANELS.TESTS, icon: <BsRocketTakeoff />, text: 'Экзамен' },
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
              size: 28,
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
