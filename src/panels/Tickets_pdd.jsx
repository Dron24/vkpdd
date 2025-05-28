import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Header,
  SimpleCell,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon28ListOutline } from '@vkontakte/icons';

export const Tickets_pdd = ({ id }) => {
  const navigator = useRouteNavigator();

  // Список билетов: можно от 1 до 40 (как в официальных экзаменах)
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
            before={<Icon28ListOutline />}
            onClick={() => navigator.push(`/ticket/${ticket.id}`)}
          >
            {ticket.title}
          </SimpleCell>
        ))}
      </Group>
    </Panel>
  );
};

