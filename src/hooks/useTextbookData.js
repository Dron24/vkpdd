import { useState, useEffect } from 'react';

export const useTextbookData = (section) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      // Проверяем, существует ли section, прежде чем искать
      if (!section) {
        console.error('❌ Не передан параметр section');
        setLoading(false);
        return;
      }

      // Ищем раздел в JSON
      const sectionData = textbookData.rules.sections.find((s) => 
        s.title && s.title.toLowerCase().replace(/\s+/g, "-") === section.toLowerCase()
      );
      
      // Проверка, если раздел не найден
      if (!sectionData) {
        console.error(`❌ Раздел с названием "${section}" не найден.`);
      }

      setData(sectionData);
    } catch (err) {
      console.error('❌ Ошибка загрузки textbookData:', err);
    } finally {
      setLoading(false);
    }
  }, [section]);

  return { data, loading };
};
