import React, { useEffect, useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack, Group, Header, SimpleCell } from "@vkontakte/vkui";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import { BsJournalBookmark, BsSignStop, BsCapslock, BsWrenchAdjustableCircle, BsShieldLock } from "react-icons/bs";

export const TextbookViewer = ({ id }) => {
  const navigator = useRouteNavigator();
  const { section } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: 'rules', title: 'Правила дорожного движения', icon: <BsJournalBookmark size={26} /> },
    { id: 'signs', title: 'Дорожные знаки', icon: <BsSignStop size={26} /> },
    { id: 'marking', title: 'Дорожная разметка', icon: <BsCapslock size={26} /> },
    { id: 'malfunctions', title: 'Перечень неисправностей', icon: <BsWrenchAdjustableCircle size={26} /> },
    { id: 'admission', title: 'Основные положения по допуску', icon: <BsShieldLock size={26} /> },
  ];

  useEffect(() => {
    if (!section) {
      console.log("❌ Параметр section не передан.");
      setLoading(false);
      return;
    }

    console.log('❓ Проверка: Загрузка данных для раздела:', section);
    setLoading(true);

    fetch(`${import.meta.env.BASE_URL}assets/textbookData.json`) // ✅ Универсальный путь
      .then((res) => {
        if (!res.ok) {
          console.error(`❌ Ошибка загрузки JSON: ${res.statusText}`);
          throw new Error("Ошибка загрузки файла JSON");
        }
        return res.json();
      })
      .then((json) => {
        console.log('❓ Данные, полученные из JSON:', json);

        const sectionFormatted = section ? section.toLowerCase().replace(/\s+/g, "-") : '';
        const mainSection = json[sectionFormatted];

        if (!mainSection || !mainSection.sections) {
          console.error(`❌ Раздел не найден: ${sectionFormatted}`);
          setData(null);
          setLoading(false);
          return;
        }

        const sectionData = mainSection.sections;

        if (!sectionData) {
          console.error(`❌ Подразделы не найдены для раздела ${sectionFormatted}`);
          setData(null);
          setLoading(false);
          return;
        }

        setData({ title: mainSection.title, subsections: sectionData });
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Ошибка загрузки textbookData:', err);
        setData(null);
        setLoading(false);
      });
  }, [section]);

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />} />
        Загрузка...
      </Panel>
    );
  }

  if (!data || !data.subsections) {
    console.error('❌ Нет данных или подразделов.');
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>Раздел не найден</PanelHeader>
        <Group>
          <SimpleCell>Такого раздела не существует или нет подразделов.</SimpleCell>
        </Group>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>{data.title}</PanelHeader>
      <Group header={<Header mode="primary">Разделы</Header>}>
        {data.subsections.map((sub, idx) => (
          <SimpleCell
            key={idx}
            before={sections.find((section) => section.id === sub.id)?.icon || <BsJournalBookmark size={26} />}
            onClick={() => {
              const subHeading = sub.title.toLowerCase().replace(/\s+/g, "-");
              navigator.push(`/textbook/${section}/${encodeURIComponent(subHeading)}`);
            }}
            expandable="true"
          >
            {sub.title}
          </SimpleCell>
        ))}
      </Group>
    </Panel>
  );
};
