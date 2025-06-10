import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import textbookData from '../../assets/textbookData.json';


export const TextbookRules = ({ id }) => {
  const navigator = useRouteNavigator();
  const rules = textbookData?.rules;

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        {rules?.title || 'Раздел'}
      </PanelHeader>
      <Group>
        <Div>
          {rules?.content ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: rules.content }}
            />
          ) : (
            <div>Контент не загружен</div>
          )}
        </Div>
      </Group>
    </Panel>
  );
};
