import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import textbookData from '../../assets/textbookData.json';


export const TextbookMarking = ({ id }) => {
  const navigator = useRouteNavigator();
  const marking = textbookData?.marking;

  return (
    <Panel id={id}>
          <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
            {marking?.title || 'Раздел'}
          </PanelHeader>
          <Group>
            <Div>
              {marking?.content ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: marking.content }}
                />
              ) : (
                <div>Контент не загружен</div>
              )}
            </Div>
          </Group>
        </Panel>
  );
};