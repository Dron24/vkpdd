import React from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Group, Div, Text } from "@vkontakte/vkui";
import { AnimatedSpinner } from "../../components/AnimatedSpinner";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import { useTextbookData } from "../../hooks/useTextbookData";

export const TextbookSubsection = ({ id }) => {
  const navigator = useRouteNavigator();
  const { section, sub } = useParams(); // section = rules, sub = "1. общие положения"

  const { data, loading } = useTextbookData(section);

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Загрузка...</PanelHeader>
        <AnimatedSpinner />
      </Panel>
    );
  }

  if (!data || !data.sections) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Раздел не найден</PanelHeader>
        <Group>
          <Div>Такого раздела не существует.</Div>
        </Group>
      </Panel>
    );
  }

  // ✅ Ищем section.title
  const matchedSection = data.sections.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, "-") === sub.toLowerCase()
  );

  if (!matchedSection) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Раздел не найден</PanelHeader>
        <Group>
          <Div>Раздел не найден по адресу: {sub}</Div>
        </Group>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        {matchedSection.title}
      </PanelHeader>
      <Group>
        <Div>
          {matchedSection.subsections.map((subsection, idx) => (
            <div key={idx} style={{ marginBottom: 16 }}>
              <Text weight="2" style={{ marginBottom: 8 }}>{subsection.heading}</Text>
              {subsection.blocks?.map((block, bIdx) => {
                if (block.type === "paragraph") {
                  return (
                    <Text key={bIdx} style={{ marginBottom: 8, lineHeight: 1.5 }}>
                      {block.content.map((part, i) => {
                        if (part.type === "highlight") {
                          return (
                            <span key={i} style={{
                              backgroundColor: "#4BB34B",
                              color: "white",
                              padding: "2px 4px",
                              borderRadius: "4px",
                              marginRight: 4,
                            }}>{part.content}</span>
                          );
                        }
                        if (part.type === "bold") {
                          return <strong key={i}>{part.content}</strong>;
                        }
                        return <span key={i}>{part.content}</span>;
                      })}
                    </Text>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </Div>
      </Group>
    </Panel>
  );
};
