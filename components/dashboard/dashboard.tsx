"use client";

import { useState } from "react";
import Card from "./card";
import Toolbar from "./toolbar";

const mock = [
  {
    id: "1",
    title: "Example Link 1",
    link: "https://vercel.com/",
    status: "Saved",
  },
  {
    id: "2",
    title: "Example Link 2",
    link: "https://example.com/2",
    status: "Visited",
  },
  {
    id: "3",
    title: "Example Link 3",
    link: "https://example.com/3",
    status: "Archived",
  },
  {
    id: "4",
    title: "Example Link 4",
    link: "https://example.com/4",
    status: "Saved",
  },
  {
    id: "5",
    title: "Example Link 5",
    link: "https://example.com/5",
    status: "Visited",
  },
  {
    id: "6",
    title: "Example Link 6",
    link: "https://example.com/6",
    status: "Archived",
  },
  {
    id: "7",
    title: "Example Link 7",
    link: "https://example.com/7",
    status: "Saved",
  },
  {
    id: "8",
    title: "Example Link 8",
    link: "https://example.com/8",
    status: "Visited",
  },
  {
    id: "9",
    title: "Example Link 9",
    link: "https://example.com/9",
    status: "Archived",
  },
];

const Dashboard = () => {
  const [data, setData] = useState(mock);
  const [searchableItems, setSearch] = useState(mock);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [checked, setChecked] = useState({});
  const [editableCard, setEditableCard] = useState(null);

  console.log(link, title);

  const addLink = ({ title, link }) => {
    const newItem = {
      id: Date.now().toString(),
      title: title,
      link: link,
      status: "Saved",
    };
    const updatedData = [...data, newItem];
    setData(updatedData);
    setSearch(updatedData);
  };

  const deleteCard = (id: string) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setSearch(updatedData);
  };

  // const bulkDeleteCards = () => {
  //   const ids = Object.keys(checked).filter((id) => checked[id]);
  //   const keep = data.filter((item) => !ids.includes(item.id));
  //   setSearch(keep);
  //   setData(keep);
  //   setChecked({});
  // };

  const editCard = (id: string) => {
    const cardToEdit = data.find((item) => item.id === id);
    if (cardToEdit) {
      setEditableCard({ id, title: cardToEdit.title, link: cardToEdit.link });
    }
  };

  const onSave = (id: string | null, title?: string, link?: string) => {
    if (id === null) {
      setEditableCard(null);
      return;
    }
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, title, link } : item,
    );
    setData(updatedData);
    setSearch(updatedData);
    setEditableCard(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 w-full gap-6 bg-gray-50">
      <div className="w-full max-w-7xl">
        <Toolbar
          data={data}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          onAddLink={addLink}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center w-full max-w-7xl">
        {searchableItems.map(({ id, title, link, status }, index) => (
          <Card
            id={id}
            title={title}
            link={link}
            status={status}
            onClick={() => {
              setChecked({
                ...checked,
                [id]: !checked[id],
              });
            }}
            onEdit={editCard}
            onDelete={() => deleteCard(id)}
            editableCard={editableCard}
            onSave={onSave}
            checked={checked[id] || false}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
