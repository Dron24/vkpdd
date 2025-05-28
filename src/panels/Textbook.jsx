import React from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Header,
  Div,
  SimpleCell
} from '@vkontakte/vkui';
import { Icon28ChevronRightOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Textbook = ({ id }) => {
  const navigator = useRouteNavigator();

  const sections = [
    'Общие положения',
    'Дорожные знаки',
    'Дорожная разметка',
    'Сигналы светофоров и регулировщика',
    'Начало движения, маневрирование',
    'Расположение транспортных средств',
    'Остановка и стоянка',
    'Преимущество проезда',
    'Пешеходы и велосипедисты',
    'Железнодорожные переезды',
    'Общественный транспорт',
    'Особые условия движения',
    'Скоростной режим',
    'Безопасность и ответственность',
    'Медицинская помощь при ДТП',
  ];

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        Учебник ПДД
      </PanelHeader>

      <Group header={<Header mode="primary">Разделы учебника</Header>}>
        <Div>
          {sections.map((section, index) => (
            <SimpleCell
              key={index}
              expandable
              onClick={() => {
                // можно добавить navigator.push(`/textbook/${index}`) или открыть модалку
              }}
              after={<Icon28ChevronRightOutline />}
            >
              {section}
            </SimpleCell>
          ))}
        </Div>
      </Group>
    </Panel>
  );
};
