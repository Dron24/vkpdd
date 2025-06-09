import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const pages = {
  TextbookRules: 'https://www.drom.ru/pdd/pdd/',
  TextbookSigns: 'https://www.drom.ru/pdd/pdd/signs/',
  TextbookMarking: 'https://www.drom.ru/pdd/pdd/marking/',
  TextbookMalfunctions: 'https://www.drom.ru/pdd/pdd/fault_list/',
  TextbookAdmission: 'https://www.drom.ru/pdd/pdd/permission/',
};

const textbookPath = path.resolve('src/panels/textbook');
if (!fs.existsSync(textbookPath)) {
  fs.mkdirSync(textbookPath, { recursive: true });
}

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();

for (const [filename, url] of Object.entries(pages)) {
  await page.goto(url, { waitUntil: 'networkidle2' });

  const { header, html } = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.innerText || 'Раздел';
    const article = document.querySelector('article') || document.querySelector('main');
    const content = article ? article.innerHTML : '<p>Контент не найден</p>';
    return {
      header: h1,
      html: content,
    };
  });

  const formattedHtml = html
    .replace(/\n/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/"/g, '\\"');

  const jsxCode = `
import { Panel, PanelHeader, PanelHeaderBack, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const ${filename} = ({ id }) => {
  const navigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        ${header}
      </PanelHeader>
      <Group>
        <Div>
          <div dangerouslySetInnerHTML={{ __html: "${formattedHtml}" }} />
        </Div>
      </Group>
    </Panel>
  );
};
`.trim();

  const filePath = path.join(textbookPath, `${filename}.jsx`);
  fs.writeFileSync(filePath, jsxCode, 'utf-8');
  console.log(`✅ Создан: ${filePath}`);
}

await browser.close();
