"use client";

import { useEffect, useMemo, useState } from "react";
import FolderToolbar from "./folder-toolbar";
import FolderCard from "./folder-card";
import { Link } from "lucide-react";
import Breadcrumbs from "../breadcrumb";
import { useFolders, useLinks } from "@/server/actions/links";
import {
  useDeleteLinkMutation,
  useUpdateCountMutation,
  useUpdateLinkMutation,
} from "@/server/actions/add";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  domain: string;
  openedCount: number;
};

type FolderDashboardProps = {
  folderId: string;
};

function useDebouncedValue<T>(value: T, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

const FolderDashboard = ({ folderId }: FolderDashboardProps) => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({});
  const [editableCard, setEditableCard] = useState<null | {
    id: string;
    title: string;
    link: string;
  }>(null);

  const { data: links, isLoading: isLinksLoading } = useLinks(folderId);
  const { data: folders, isLoading: isFoldersLoading } = useFolders();
  const { mutate: updateLink } = useUpdateLinkMutation();
  const { mutate: updateCount } = useUpdateCountMutation();
  const { mutate: deleteLink } = useDeleteLinkMutation();

  const currentFolderName = folders?.find(
    (folder) => folder.id === folderId,
  )?.name;

  const searchableItems = useMemo(() => {
    if (!search.trim()) return links;

    return links.filter(({ title, url }) =>
      [title, url].some((field) =>
        field.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, links]);

  console.log("Searchable items:", searchableItems);

  const onSave = async (id: string | null, title?: string, link?: string) => {
    if (id === null) {
      setEditableCard(null);
      return;
    }

    if (!title?.trim() || !link?.trim()) {
      console.error("Title and link are required");
      return;
    }

    updateLink(
      { id, title: title.trim(), link: link.trim() },
      {
        onSuccess: () => {
          setEditableCard(null);
        },
      },
    );
  };

  if (isLinksLoading || isFoldersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
        <div className="text-center bg-white/95 backdrop-blur-md border border-red-200/50 rounded-xl shadow-lg shadow-red-100/30 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4" />
          <div className="text-lg font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <Breadcrumbs folders={folders} page={currentFolderName} showDropdown />
        <div className="mt-2 mb-4">
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {currentFolderName}
          </div>
        </div>

        <div className=" mb-8 bg-white/95 backdrop-blur-md border border-red-200/50 rounded-xl shadow-lg shadow-red-100/30 p-6">
          <FolderToolbar
            search={search}
            onChangeSearch={(val) => setSearch(val)}
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
              {searchableItems.length} link
              {searchableItems.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {searchableItems.length === 0 ? (
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
            {searchableItems.map(({ id, title, url, domain, openedCount }) => (
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
                onDelete={() => {
                  deleteLink(id);
                }}
                onEdit={(editId: string) => {
                  const cardToEdit = links.find((item) => item.id === editId);
                  if (cardToEdit) {
                    setEditableCard({
                      id: editId,
                      title: cardToEdit.title,
                      link: cardToEdit.url,
                    });
                  }
                }}
                onUpdateLinkCount={(id: string) => updateCount({ id })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderDashboard;
