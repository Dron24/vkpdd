import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import textbookData from '../../assets/textbookData.json';


export const TextbookMalfunctions = ({ id }) => {
  const navigator = useRouteNavigator();
  const malfunctions = textbookData?.malfunctions;

  return (
    <Panel id={id}>
          <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
            {malfunctions?.title || 'Раздел'}
          </PanelHeader>
          <Group>
            <Div>
              {malfunctions?.content ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: malfunctions.content }}
                />
              ) : (
                <div>Контент не загружен</div>
              )}
            </Div>
          </Group>
        </Panel>
  );
};