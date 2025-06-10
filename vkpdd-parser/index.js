import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const pages = [
  {
    id: 'rules',
    url: 'https://www.drom.ru/pdd/pdd/',
    title: 'Правила дорожного движения',
  },
  {
    id: 'signs',
    url: 'https://www.drom.ru/pdd/pdd/signs/',
    title: 'Дорожные знаки',
  },
  {
    id: 'marking',
    url: 'https://www.drom.ru/pdd/pdd/marking/',
    title: 'Дорожная разметка',
  },
  {
    id: 'malfunctions',
    url: 'https://www.drom.ru/pdd/pdd/fault_list/',
    title: 'Перечень неисправностей',
  },
  {
    id: 'admission',
    url: 'https://www.drom.ru/pdd/pdd/permission/',
    title: 'Допуск к эксплуатации',
  },
];

const parsePage = async (page, browser) => {
  const pageObj = await browser.newPage();

  // Настраиваем как обычный браузер
  await pageObj.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  await pageObj.setViewport({ width: 1280, height: 800 });

  console.log(`📥 Загружаем: ${page.url}`);

  try {
    await pageObj.goto(page.url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    const content = await pageObj.evaluate(() => {
      const containers = document.querySelectorAll('.b-media-cont_margin_b-size-m');
      for (const container of containers) {
        if (container.querySelector('.pub')) {
          return container.innerHTML.trim();
        }
      }
      return '';
    });

    await pageObj.close();

    return {
      title: page.title,
      content,
    };
  } catch (err) {
    console.error(`❌ Ошибка при парсинге ${page.url}:`, err.message);
    await pageObj.close();
    return {
      title: page.title,
      content: '',
    };
  }
};

const run = async () => {
  const browser = await puppeteer.launch({
    headless: false, // включи true, если не нужно видеть браузер
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
  });

  const result = {};

  for (const page of pages) {
    const parsed = await parsePage(page, browser);
    result[page.id] = {
      title: parsed.title,
      content: parsed.content,
    };
  }

  await browser.close();

  const outputPath = path.resolve('src/assets/textbookData.json');
  await fs.writeFile(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log('✅ Данные сохранены в', outputPath);
};

run();
