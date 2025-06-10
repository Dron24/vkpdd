import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import textbookData from '../../assets/textbookData.json';


export const TextbookAdmission = ({ id }) => {
  const navigator = useRouteNavigator();
  const admission = textbookData?.admission;

  return (
    <Panel id={id}>
          <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
            {admission?.title || 'Раздел'}
          </PanelHeader>
          <Group>
            <Div>
              {admission?.content ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: admission.content }}
                />
              ) : (
                <div>Контент не загружен</div>
              )}
            </Div>
          </Group>
        </Panel>
  );
};