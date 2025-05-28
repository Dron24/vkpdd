import {
  Panel,
  PanelHeader,
  Group,
  SimpleCell,
  Header,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import { Icon28BookOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Textbook = ({ id }) => {
  const navigator = useRouteNavigator();

  const sections = [
    { id: 'section-1', title: 'Общие положения' },
    { id: 'section-2', title: 'Обязанности участников движения' },
    { id: 'section-3', title: 'Дорожные знаки и разметка' },
    { id: 'section-4', title: 'Светофоры и регулировка' },
    { id: 'section-5', title: 'Маневрирование и начало движения' },
    { id: 'section-6', title: 'Расположение на дороге' },
    { id: 'section-7', title: 'Скоростной режим' },
    { id: 'section-8', title: 'Проезд перекрёстков' },
    { id: 'section-9', title: 'Пешеходы и остановки' },
    { id: 'section-10', title: 'Сигналы и обозначения' },
    { id: 'section-11', title: 'Движение в сложных условиях' },
    { id: 'section-12', title: 'Спецсигналы и преимущества' },
    { id: 'section-13', title: 'Железнодорожные переезды' },
    { id: 'section-14', title: 'Административная ответственность' },
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
            before={<Icon28BookOutline />}
            onClick={() => navigator.push(`/textbook/${section.id}`)}
          >
            {section.title}
          </SimpleCell>
        ))}
      </Group>
    </Panel>
  );
};

