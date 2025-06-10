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
import { MdListAlt } from 'react-icons/md';

export const Tickets_pdd = ({ id }) => {
  const navigator = useRouteNavigator();

  // 40 билетов, как в официальных экзаменах
  const tickets = Array.from({ length: 40 }, (_, i) => ({
    id: `ticket-${i + 1}`,
    title: `Билет №${i + 1}`,
  }));

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        Билеты
      </PanelHeader>
      <Group header={<Header mode="primary">Экзаменационные билеты</Header>}>
        {tickets.map((ticket) => (
          <SimpleCell
            key={ticket.id}
            before={<MdListAlt size={28} />}
            onClick={() => navigator.push(`/ticket/${ticket.id}`)}
          >
            {ticket.title}
          </SimpleCell>
        ))}
      </Group>
    </Panel>
  );
};
