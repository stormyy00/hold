"use client";

import { useEffect, useState } from "react";
import Card from "./card";
import Toolbar from "./toolbar";
import {
  AddLink,
  deleteLink,
  GetLinks,
  updateLink,
  updateLinkCount,
} from "@/server/queries/getLinks";
import { desc } from "drizzle-orm";

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

const addLink = async (
  title: string,
  description: string,
  link: string,
  domain: string,
) => {
  const { result, status, message } = await AddLink(
    title,
    description,
    link,
    domain,
  );
  if (status === 200) {
    console.log("Link added successfully:", result);
  } else {
    console.error(message);
  }
};

const Dashboard = () => {
  const [data, setData] = useState(mock);
  const [searchableItems, setSearch] = useState(mock);
  const [filter, setFilter] = useState("all");
  const [checked, setChecked] = useState({});
  const [editableCard, setEditableCard] = useState(null);

  useEffect(() => {
    getLinks();
  }, []);
  const getLinks = async () => {
    const { result, status, message } = await GetLinks();
    if (status === 200) {
      console.log("Links retrieved successfully:", result);
      setData(result);
      setSearch(result);
      console.log("Links retrieved successfully:", message);
    } else {
      console.error("Error retrieving links:");
    }
  };

  const addLink = async ({ title, link }: { title: string; link: string }) => {
    const domain = new URL(link).hostname.replace(/^www\./, "");
    const description = "";
    const newItem = {
      title: title,
      link: link,
      description: description,
      domain: domain,
      openedCount: 0,
    };

    const updatedData = [...data, newItem];
    setData(updatedData);
    setSearch(updatedData);

    const { result, status, message } = await AddLink(
      title,
      description,
      link,
      domain,
    );
    if (status === 200) {
      console.log("Link added successfully:", result);
    } else {
      console.error(message);
    }
  };

  const deleteCard = async (id: string) => {
    const { status, message } = await deleteLink(id);
    if (status === 200) {
      setData((prev) => prev.filter((item) => item.id !== id));
      setSearch((prev) => prev.filter((item) => item.id !== id));
    } else {
      console.error(message);
    }
  };

  // const bulkDeleteCards = () => {
  //   const ids = Object.keys(checked).filter((id) => checked[id]);
  //   const keep = data.filter((item) => !ids.includes(item.id));
  //   setSearch(keep);
  //   setData(keep);
  //   setChecked({});
  // };

  const updateCount = async (id: string, openedCount: number) => {
    const { status, message } = await updateLinkCount(id, openedCount);
    if (status === 200) {
      console.log("Link updated successfully:", message);
    } else {
      console.error(message);
    }
  };

  const editCard = (id: string) => {
    const cardToEdit = data.find((item) => item.id === id);
    if (cardToEdit) {
      setEditableCard({ id, title: cardToEdit.title, link: cardToEdit.link });
    }
  };

  const onSave = async (id: string | null, title?: string, link?: string) => {
    if (id === null) {
      setEditableCard(null);
      return;
    }

    if (!title || !link) {
      console.error("Title and link are required");
      return;
    }

    const updatedData = data.map((item) =>
      item.id === id ? { ...item, title, link } : item,
    );

    const foundItem = updatedData.find((item) => item.id === id);
    if (!foundItem) return;

    const updatedDomain = new URL(link).hostname.replace(/^www\./, "");
    const description = "";
    const { status, message } = await updateLink(
      id,
      title,
      description,
      link,
      updatedDomain,
    );

    if (status === 200) {
      console.log("Link updated successfully:", message);
    } else {
      console.error(message);
    }

    setData(updatedData as typeof data);
    setSearch(updatedData as typeof data);
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
        {searchableItems.map(
          ({ id, title, link, status, domain, openedCount }, index) => (
            <Card
              id={id}
              title={title}
              link={link}
              status={status}
              domain={domain}
              openedCount={openedCount}
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
              onUpdateLinkCount={updateCount}
              key={index}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Dashboard;
