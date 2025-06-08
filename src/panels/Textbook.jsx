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
    { id: 'rules', title: 'Правила дорожного движения' },
    { id: 'signs', title: 'Дорожные знаки' },
    { id: 'marking', title: 'Дорожная разметка' },
    { id: 'malfunctions', title: 'Перечень неисправностей' },
    { id: 'admission', title: 'Основные положения по допуску' },
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