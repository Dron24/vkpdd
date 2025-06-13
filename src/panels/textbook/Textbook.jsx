import React from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Header,
  SimpleCell,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { BsSignStop, BsJournalBookmark, BsCapslock, BsWrenchAdjustableCircle, BsShieldLock } from "react-icons/bs";

export const Textbook = ({ id }) => {
  const navigator = useRouteNavigator();

  const sections = [
    { id: 'rules', title: 'Правила дорожного движения', icon: <BsJournalBookmark size={26} /> },
    { id: 'signs', title: 'Дорожные знаки', icon: <BsSignStop size={26} /> },
    { id: 'marking', title: 'Дорожная разметка', icon: <BsCapslock size={26} /> },
    { id: 'malfunctions', title: 'Перечень неисправностей', icon: <BsWrenchAdjustableCircle size={26} /> },
    { id: 'admission', title: 'Основные положения по допуску', icon: <BsShieldLock size={26} /> },
  ];

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        Учебник ПДД
      </PanelHeader>
      <Group header={<Header mode="primary">Разделы</Header>}>
        {sections.map((section) => (
          <SimpleCell
  key={section.id}
  before={section.icon}
  onClick={() => navigator.push(`/textbook/${section.id}`)}
  expandable={true}
>
  {section.title}
</SimpleCell>

        ))}
      </Group>
    </Panel>
  );
};
