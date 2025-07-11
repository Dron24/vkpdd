import React, { useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Header,
  SimpleCell,
} from "@vkontakte/vkui";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import {
  BsJournalBookmark,
  BsSignStop,
  BsCapslock,
  BsWrenchAdjustableCircle,
  BsShieldLock,
} from "react-icons/bs";
import { AnimatedSpinner } from "../../components/AnimatedSpinner";

export const TextbookViewer = ({ id }) => {
  const navigator = useRouteNavigator();
  const { section } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: "rules", title: "Правила дорожного движения", icon: <BsJournalBookmark size={26} /> },
    { id: "signs", title: "Дорожные знаки", icon: <BsSignStop size={26} /> },
    { id: "marking", title: "Дорожная разметка", icon: <BsCapslock size={26} /> },
    { id: "malfunctions", title: "Перечень неисправностей", icon: <BsWrenchAdjustableCircle size={26} /> },
    { id: "admission", title: "Основные положения по допуску", icon: <BsShieldLock size={26} /> },
  ];

  useEffect(() => {
    if (!section) return setLoading(false);

    const sectionFormatted = section.toLowerCase().replace(/\s+/g, "-");

    fetch(`${import.meta.env.BASE_URL}assets/textbookData.json`)
      .then((res) => res.json())
      .then((json) => {
        const mainSection = json[sectionFormatted];
        if (!mainSection || !mainSection.sections) return setData(null);

        setData({
          title: mainSection.title,
          subsections: mainSection.sections,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [section]);

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
          Загрузка...
        </PanelHeader>
        <Group>
          <AnimatedSpinner />
        </Group>
      </Panel>
    );
  }

  if (!data || !data.subsections) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
          Раздел не найден
        </PanelHeader>
        <Group>
          <SimpleCell>Такого раздела не существует или нет подразделов.</SimpleCell>
        </Group>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigator.back()} />}>
        {data.title}
      </PanelHeader>
      <Group header={<Header mode="primary">Разделы</Header>}>
        {data.subsections.map((sub, idx) => (
          <SimpleCell
            key={idx}
            before={sections.find((s) => s.id === sub.id)?.icon || <BsJournalBookmark size={26} />}
            onClick={() =>
              navigator.push(`/textbook/${section}/${encodeURIComponent(sub.title.toLowerCase().replace(/\s+/g, "-"))}`)
            }
            expandable="true"
          >
            {sub.title}
          </SimpleCell>
        ))}
      </Group>
    </Panel>
  );
};
