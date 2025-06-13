import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import https from 'https';

// Получаем __dirname (для ES-модулей)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути
const textbookPath = path.join(__dirname, '../src/assets/textbookData.json');
const imageDir = path.join(__dirname, '../public/images/pdd');

// Страницы для парсинга
const pages = [
  {
    id: 'rules',
    title: 'Правила дорожного движения',
    url: 'https://www.drom.ru/pdd/pdd/',
  },
  {
    id: 'signs',
    title: 'Дорожные знаки',
    url: 'https://www.drom.ru/pdd/pdd/signs/',
  },
  {
    id: 'marking',
    title: 'Дорожная разметка',
    url: 'https://www.drom.ru/pdd/pdd/marking/',
  },
  {
    id: 'faults',
    title: 'Перечень неисправностей',
    url: 'https://www.drom.ru/pdd/pdd/fault_list/',
  },
];

// Утилита для скачивания изображения
const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${res.statusCode} on ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

// Основной парсер
const run = async () => {
  console.log('🚀 Запуск парсера DROM.RU\n');

  // Создание папки под изображения
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
    console.log('📁 Создана папка для изображений:', imageDir);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const textbook = {};

  for (const pageCfg of pages) {
    console.log(`🔎 Парсинг: ${pageCfg.title}`);
    console.log(`📥 Загружаем: ${pageCfg.url}`);

    await page.goto(pageCfg.url, { waitUntil: 'domcontentloaded' });

    const sections = await page.evaluate(() => {
      const clean = t => (t || '').replace(/\s+/g, ' ').trim();
      const result = [];
      let currentSection = null;

      const pubs = document.querySelectorAll('div.pub');
      pubs.forEach(pub => {
        const h3 = pub.querySelector('h3.b-title_type_h3');
        const h4 = pub.querySelector('h4.b-title_type_h4');
        const content = pub.querySelector('div.pub__text');
        const image = pub.querySelector('div.pub__img img');

        if (h3) {
          if (currentSection) result.push(currentSection);
          currentSection = {
            title: clean(h3.textContent),
            subsections: []
          };
        }

        // Изображение вне текста
        if (image && currentSection) {
          const src = image.getAttribute('src');
          const alt = image.getAttribute('alt') || '';
          currentSection.subsections.push({
            heading: 'Иллюстрация',
            blocks: [{ type: 'image', content: { src, alt } }]
          });
        }

        if (h4 && content && currentSection) {
          const blocks = [];
          content.childNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            const tag = node.tagName;
            if (tag === 'P') {
              const txt = clean(node.textContent);
              if (txt) blocks.push({ type: 'paragraph', content: txt });
            } else if (tag === 'UL' || tag === 'OL') {
              const items = Array.from(node.querySelectorAll('li')).map(li => clean(li.textContent));
              blocks.push({ type: 'list', ordered: tag === 'OL', items });
            } else if (node.querySelectorAll('img').length) {
              Array.from(node.querySelectorAll('img')).forEach(img => {
                const src = img.getAttribute('src');
                const alt = img.getAttribute('alt') || '';
                blocks.push({ type: 'image', content: { src, alt } });
              });
            }
          });

          currentSection.subsections.push({
            heading: clean(h4.textContent),
            blocks
          });
        }
      });

      if (currentSection) result.push(currentSection);
      return result;
    });

    // Обработка изображений
    for (const section of sections) {
      for (const subsection of section.subsections) {
        for (const block of subsection.blocks) {
          if (block.type === 'image') {
            try {
              const imageUrl = block.content.src;
              const filename = path.basename(new URL(imageUrl).pathname);
              const destPath = path.join(imageDir, filename);
              block.content.src = `/images/pdd/${filename}`;

              if (!fs.existsSync(destPath)) {
                console.log(`📸 Скачиваем: ${filename}`);
                await downloadImage(imageUrl, destPath);
              } else {
                console.log(`✅ Уже загружено: ${filename}`);
              }
            } catch (err) {
              console.warn('⚠️ Ошибка загрузки изображения:', err.message);
            }
          }
        }
      }
    }

    textbook[pageCfg.id] = {
      title: pageCfg.title,
      sections,
    };

    console.log(`✅ Разделов обработано: ${sections.length}\n`);
  }

  await browser.close();

  fs.writeFileSync(textbookPath, JSON.stringify(textbook, null, 2), 'utf8');
  console.log('\n📘 Структура ПДД сохранена в', textbookPath);
};

run();
