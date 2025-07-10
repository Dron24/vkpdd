import { useState, useEffect } from "react";

export const useTextbookData = (sectionKey) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sectionKey) {
      console.error("❌ Параметр section не передан");
      return;
    }

    setLoading(true);

    const formattedKey = sectionKey.toLowerCase().replace(/\s+/g, "-");

    fetch(`${import.meta.env.BASE_URL}assets/textbookData.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка загрузки JSON");
        }
        return res.json();
      })
      .then((json) => {
        const section = json[formattedKey];
        if (!section || !section.sections) {
          console.error(`❌ Раздел "${formattedKey}" не найден в JSON`);
          setData(null);
        } else {
          setData(section);
        }
      })
      .catch((err) => {
        console.error("❌ Ошибка загрузки textbookData:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [sectionKey]);

  return { data, loading };
};
