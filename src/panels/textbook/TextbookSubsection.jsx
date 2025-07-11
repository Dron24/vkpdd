import React from "react";
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  Text,
} from "@vkontakte/vkui";
import { AnimatedSpinner } from "../../components/AnimatedSpinner";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import { useTextbookData } from "../../hooks/useTextbookData";

export const TextbookSubsection = ({ id }) => {
  const navigator = useRouteNavigator();
  const { section, sub } = useParams();
  const { data, loading } = useTextbookData(section);

  if (!section || !sub) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => navigator.back()} />}
        >
          Ошибка
        </PanelHeader>
        <Group>
          <Div>Некорректный URL. Параметры отсутствуют.</Div>
        </Group>
      </Panel>
    );
  }

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => navigator.back()} />}
        >
          Загрузка...
        </PanelHeader>
        <AnimatedSpinner />
      </Panel>
    );
  }

  if (!data?.sections) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => navigator.back()} />}
        >
          Раздел не найден
        </PanelHeader>
        <Group>
          <Div>Такого раздела не существует.</Div>
        </Group>
      </Panel>
    );
  }

  const matchedSection = data.sections.find(
    (s) =>
      s.title.toLowerCase().replace(/\s+/g, "-") === sub.toLowerCase()
  );

  if (!matchedSection) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => navigator.back()} />}
        >
          Подраздел не найден
        </PanelHeader>
        <Group>
          <Div>Адрес: {sub}</Div>
        </Group>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => navigator.back()} />}
      >
        {matchedSection.title}
      </PanelHeader>
      <Group>
        <Div>
          {matchedSection.subsections.map((subsection, idx) => (
            <div key={idx} style={{ marginBottom: 16 }}>
              <Text weight="2" style={{ marginBottom: 8 }}>
                {subsection.heading}
              </Text>

              {subsection.blocks?.map((block, bIdx) => {
                if (block.type === "paragraph") {
                  return (
                    <Text
                      key={bIdx}
                      style={{ marginBottom: 8, lineHeight: 1.5 }}
                    >
                      {block.content.map((part, i) => (
                        <span key={i}>{part.content}</span>
                      ))}
                    </Text>
                  );
                }

                if (block.type === "image") {
                  return (
                    <div
                      key={bIdx}
                      style={{ margin: "12px 0", textAlign: "center" }}
                    >
                      <img
                        src={block.content.src}
                        alt={block.content.alt || ""}
                        style={{ maxWidth: "100%", borderRadius: 8 }}
                        onError={() =>
                          console.error("Не загрузилось:", block.content.src)
                        }
                      />
                    </div>
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
