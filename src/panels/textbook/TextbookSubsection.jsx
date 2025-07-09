import React from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Group, Div, Text } from "@vkontakte/vkui";
import { AnimatedSpinner } from "../../components/AnimatedSpinner";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import { useTextbookData } from "../../hooks/useTextbookData";  // Импортируем хук

export const TextbookSubsection = ({ id }) => {
  const navigator = useRouteNavigator();
  const { section, sub } = useParams(); // Получаем section и sub из URL

  // Используем хук для загрузки данных
  const { data, loading } = useTextbookData(section);

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Загрузка...</PanelHeader>
        <AnimatedSpinner />
      </Panel>
    );
  }

  if (!data) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Подпункт не найден</PanelHeader>
        <Group>
          <Div>Такого подпункта не существует.</Div>
        </Group>
      </Panel>
    );
  }

  const subsection = data.subsections.find(
    (subsec) => subsec.heading.toLowerCase().replace(/\s+/g, "-") === sub.toLowerCase()
  );

  if (!subsection) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Подпункт не найден</PanelHeader>
        <Group>
          <Div>Такого подпункта не существует.</Div>
        </Group>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />} >
        {subsection.heading}
      </PanelHeader>
      <Group>
        <Div>
          {subsection.blocks.map((block, idx) => {
            if (block.type === "paragraph") {
              return (
                <Text key={idx} style={{ marginBottom: 8, lineHeight: 1.5 }}>
                  {block.content.map((part, i) => (
                    <span key={i}>{part.content}</span>
                  ))}
                </Text>
              );
            }
            return null;
          })}
        </Div>
      </Group>
    </Panel>
  );
};

