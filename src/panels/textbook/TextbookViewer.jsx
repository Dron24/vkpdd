import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  Title,
  Text,
  Separator,
} from "@vkontakte/vkui";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import textbookData from "../../assets/textbookData.json";

export const TextbookViewer = ({ id }) => {
  const navigator = useRouteNavigator();
  const { section } = useParams();
  const data = textbookData[section];

  if (!data) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
          Раздел не найден
        </PanelHeader>
        <Group>
          <Div>Такого раздела не существует.</Div>
        </Group>
      </Panel>
    );
  }

  const renderParagraph = (content, key) => (
    <Text key={key} style={{ marginBottom: 8, lineHeight: 1.5 }}>
      {content.map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.content}</span>;
        }
        if (part.type === "bold") {
          return (
            <strong key={index} style={{ fontWeight: 600 }}>
              {part.content}
            </strong>
          );
        }
        if (part.type === "highlight") {
          return (
            <span
              key={index}
              style={{
                backgroundColor: "#3cb371",
                color: "white",
                padding: "2px 6px",
                borderRadius: 4,
                margin: "0 2px",
                fontWeight: 600,
              }}
            >
              {part.content}
            </span>
          );
        }
        return null;
      })}
    </Text>
  );

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        {data.title}
      </PanelHeader>

      {data.sections.map((sec, idx) => (
        <Group key={idx} header={<Title level="2" style={{ padding: "12px 16px" }}>{sec.title}</Title>}>
          {sec.subsections.map((sub, sIdx) => (
            <Div key={sIdx}>
              <Title level="3" style={{ marginBottom: 8 }}>{sub.heading}</Title>

              {sub.blocks.map((block, bIdx) => {
                if (block.type === "paragraph") {
                  return renderParagraph(block.content, bIdx);
                }

                if (block.type === "list") {
                  return (
                    <ul key={bIdx} style={{ paddingLeft: 16, marginBottom: 8 }}>
                      {block.items.map((item, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          <Text>{item}</Text>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "image") {
                  return (
                    <div key={bIdx} style={{ textAlign: "center", margin: "16px 0" }}>
                      <img
                        src={block.content.src}
                        alt={block.content.alt || ""}
                        style={{ maxWidth: "100%", borderRadius: 8 }}
                      />
                      {block.content.alt && (
                        <Text style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                          {block.content.alt}
                        </Text>
                      )}
                    </div>
                  );
                }

                return null;
              })}

              <Separator style={{ margin: "16px 0" }} />
            </Div>
          ))}
        </Group>
      ))}
    </Panel>
  );
};
