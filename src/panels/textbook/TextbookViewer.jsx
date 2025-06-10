import { Panel, PanelHeader, PanelHeaderBack, Group, Div, SimpleCell } from "@vkontakte/vkui";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import textbookData from "../../assets/textbookData.json";

export const TextbookViewer = ({ id }) => {
  const navigator = useRouteNavigator();
  const { section } = useParams(); // получаем параметр из URL, например: "rules", "signs"
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

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        {data.title}
      </PanelHeader>
      <Group>
        <Div>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </Div>
      </Group>
    </Panel>
  );
};
