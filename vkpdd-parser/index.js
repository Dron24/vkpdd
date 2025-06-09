import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import iconv from 'iconv-lite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { url: 'https://www.drom.ru/pdd/pdd/', filename: 'TextbookRules.jsx', title: 'Правила дорожного движения' },
  { url: 'https://www.drom.ru/pdd/pdd/signs/', filename: 'TextbookSigns.jsx', title: 'Дорожные знаки' },
  { url: 'https://www.drom.ru/pdd/pdd/marking/', filename: 'TextbookMarking.jsx', title: 'Дорожная разметка' },
  { url: 'https://www.drom.ru/pdd/pdd/fault_list/', filename: 'TextbookMalfunctions.jsx', title: 'Перечень неисправностей' },
  { url: 'https://www.drom.ru/pdd/pdd/permission/', filename: 'TextbookAdmission.jsx', title: 'Допуск к эксплуатации' },
];

const outputDir = path.resolve(__dirname, '../src/panels/textbook');

async function parsePage({ url, filename, title }) {
  console.log(`📥 Загружается: ${url}`);

  const response = await axios.get(url, {
    responseType: 'arraybuffer', // получаем сырые байты
  });

  const decoded = iconv.decode(response.data, 'win1251'); // декодируем как win1251
  const $ = cheerio.load(decoded);
  const blocks = $('.b-media-cont_margin_b-size-m');

  if (blocks.length === 0) {
    console.error(`❌ Контент не найден: ${url}`);
    return;
  }

  let content = '';
  blocks.each((_, el) => {
    content += $(el).html();
  });

  const cleaned = content
    .replace(/\s+/g, ' ')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/`/g, '\\`')
    .trim();

  const componentName = filename.replace('.jsx', '');

  const jsx = `
import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const ${componentName} = ({ id }) => {
  const navigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>${title}</PanelHeader>
      <Group>
        <Div>
          <div dangerouslySetInnerHTML={{ __html: \`${cleaned}\` }} />
        </Div>
      </Group>
    </Panel>
  );
};
  `.trim();

  fs.writeFileSync(path.join(outputDir, filename), jsx, 'utf-8');
  console.log(`✅ Создан компонент: ${filename}`);
}

(async () => {
  for (const page of pages) {
    try {
      await parsePage(page);
    } catch (e) {
      console.error(`❌ Ошибка: ${page.url}`, e.message);
    }
  }
})();
