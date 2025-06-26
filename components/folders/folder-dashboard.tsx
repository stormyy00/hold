"use client";

import { useState } from "react";
import FolderToolbar from "./folder-toolbar";
import FolderCard from "./folder-card";
import {
  deleteLink,
  updateLink,
  updateLinkCount,
} from "@/server/queries/getLinks";
import { Link } from "lucide-react";
import Breadcrumbs from "../breadcrumb";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  domain: string;
  openedCount: number;
};

type FolderDashboardProps = {
  content: LinkItem[];
  title: string;
  folderId: string;
  folders: { id: string; name: string }[];
};

const FolderDashboard = ({
  content,
  title,
  folderId,
  folders,
}: FolderDashboardProps) => {
  const [data, setData] = useState(content);
  const [search, setSearch] = useState(content);
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({});
  const [editableCard, setEditableCard] = useState<null | {
    id: string;
    title: string;
    link: string;
  }>(null);

  const onSave = async (id: string | null, title?: string, link?: string) => {
    if (id === null) {
      setEditableCard(null);
      return;
    }
    if (!title?.trim() || !link?.trim()) {
      console.error("Title and link are required");
      return;
    }
    try {
      const updatedDomain = new URL(link).hostname.replace(/^www\./, "");
      const { status, message } = await updateLink(
        id,
        title.trim(),
        "",
        link.trim(),
        updatedDomain,
      );
      if (status === 200) {
        const updatedData = data.map((item) =>
          item.id === id
            ? {
                ...item,
                title: title.trim(),
                url: link.trim(),
                domain: updatedDomain,
              }
            : item,
        );
        setData(updatedData);
        setSearch(updatedData);
        setEditableCard(null);
      } else {
        console.error("Failed to update link:", message);
      }
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <Breadcrumbs folders={folders} page={title} showDropdown />
        <div className="mb-8">
          <div className="text-3xl font-bold text-gray-900 mb-2">{title}</div>
        </div>

        <div className="mb-8 bg-white/95 backdrop-blur-md border border-red-200/50 rounded-xl shadow-lg shadow-red-100/30 p-6">
          <FolderToolbar
            data={data}
            setSearch={setSearch}
            folderId={folderId}
            // filter={filter}
            // setFilter={setFilter}
            // onAddLink={addLink}
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            Links
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            {Object.values(checked).some(Boolean) && (
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg shadow-lg shadow-red-200/50">
                {Object.values(checked).filter(Boolean).length} selected
              </span>
            )}
            <span className="text-gray-600 bg-gradient-to-r from-red-50 to-red-100 px-3 py-1 rounded-lg border border-red-200/60">
              {search.length} link
              {search.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {search.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Link size={48} className="mx-auto" />
            </div>
            <div className="text-lg font-medium text-gray-900 mb-1">
              No links found
            </div>
            <p className="text-gray-500">Add your first link to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {search.map(({ id, title, url, domain, openedCount }) => (
              <FolderCard
                key={id}
                id={id}
                name={title}
                url={url}
                domain={domain}
                openedCount={openedCount}
                editableCard={editableCard}
                checked={checked[id] || false}
                onClick={() =>
                  setChecked((prev) => ({
                    ...prev,
                    [id]: !prev[id],
                  }))
                }
                onSave={onSave}
                onDelete={async () => {
                  await deleteLink(id);
                  setData((prev) => prev.filter((folder) => folder.id !== id));
                  setSearch((prev) =>
                    prev.filter((folder) => folder.id !== id),
                  );
                }}
                onEdit={(editId: string) => {
                  const cardToEdit = data.find((item) => item.id === editId);
                  if (cardToEdit) {
                    setEditableCard({
                      id: editId,
                      title: cardToEdit.title,
                      link: cardToEdit.url,
                    });
                  }
                }}
                onUpdateLinkCount={async (linkId: string, count: number) => {
                  await updateLinkCount(linkId);
                  setData((prev) =>
                    prev.map((folder) =>
                      folder.id === linkId
                        ? { ...folder, openedCount: count }
                        : folder,
                    ),
                  );
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderDashboard;
