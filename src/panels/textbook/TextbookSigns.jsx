import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import textbookData from '../../assets/textbookData.json';


export const TextbookSigns = ({ id }) => {
  const navigator = useRouteNavigator();
  const signs = textbookData?.signs;

  return (
    <Panel id={id}>
          <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
            {signs?.title || 'Раздел'}
          </PanelHeader>
          <Group>
            <Div>
              {signs?.content ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: signs.content }}
                />
              ) : (
                <div>Контент не загружен</div>
              )}
            </Div>
          </Group>
        </Panel>
  );
};