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
import { LinkProps } from "@/types";
import Folders from "./folders";
import { getFolders, moveLinkToFolder } from "@/server/queries/folder";
import { Link } from "lucide-react";
import Breadcrumbs from "../breadcrumb";

interface FolderProps {
  id: string;
  name: string;
  link: string;
  domain: string;
  openedCount: number;
  userId: string;
  createdAt: string;
}

interface EditableCardState {
  id: string;
  title: string;
  link: string;
}

const Dashboard = () => {
  const [data, setData] = useState<LinkProps[]>([]);
  const [searchableItems, setSearch] = useState<LinkProps[]>([]);
  const [folders, setFolders] = useState<FolderProps[]>([]);
  const [filter, setFilter] = useState("all");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [editableCard, setEditableCard] = useState<EditableCardState | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setIsLoading(true);
    await Promise.all([getLinks(), fetchFolders()]);
    setIsLoading(false);
  };

  const getLinks = async () => {
    try {
      const { result, status, message } = await GetLinks();
      if (status === 200 && result) {
        console.log("Links retrieved successfully:", result);
        setData(result);
        setSearch(result);
      } else {
        console.error("Error retrieving links:", message);
      }
    } catch (error) {
      console.error("Failed to fetch links:", error);
    }
  };

  const fetchFolders = async () => {
    try {
      const { result, status, message } = await getFolders();
      if (status === 200 && result) {
        console.log("Folders retrieved successfully:", result);
        setFolders(result);
      } else {
        console.error("Error retrieving folders:", message);
      }
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    }
  };

  const addLink = async ({ title, link }: { title: string; link: string }) => {
    try {
      const domain = new URL(link).hostname.replace(/^www\./, "");
      const description = "";

      const newItem: LinkProps = {
        id: crypto.randomUUID(),
        title,
        link,
        description,
        domain,
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

        if (result?.id) {
          const finalData = updatedData.map((item) =>
            item.id === newItem.id ? { ...item, id: result.id } : item,
          );
          setData(finalData);
          setSearch(finalData);
        }
      } else {
        setData(data);
        setSearch(data);
        console.error("Failed to add link:", message);
      }
    } catch (error) {
      console.error("Error adding link:", error);
      setData(data);
      setSearch(data);
    }
  };

  const deleteCard = async (id: string) => {
    try {
      const { status, message } = await deleteLink(id);
      if (status === 200) {
        setData((prev) => prev.filter((item) => item.id !== id));
        setSearch((prev) => prev.filter((item) => item.id !== id));
        const updatedChecked = { ...checked };
        delete updatedChecked[id];
        setChecked(updatedChecked);
      } else {
        console.error("Failed to delete link:", message);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const updateCount = async (id: string, openedCount: number) => {
    try {
      const { status, message } = await updateLinkCount(id);
      if (status === 200) {
        console.log("Link count updated successfully");
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, openedCount } : item,
        );
        setData(updatedData);
        setSearch(updatedData);
      } else {
        console.error("Failed to update link count:", message);
      }
    } catch (error) {
      console.error("Error updating link count:", error);
    }
  };

  const editCard = (id: string) => {
    const cardToEdit = data.find((item) => item.id === id);
    if (cardToEdit) {
      setEditableCard({
        id,
        title: cardToEdit.title,
        link: cardToEdit.link,
      });
    }
  };

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
      const description = "";

      const { status, message } = await updateLink(
        id,
        title.trim(),
        description,
        link.trim(),
        updatedDomain,
      );

      if (status === 200) {
        console.log("Link updated successfully");
        const updatedData = data.map((item) =>
          item.id === id
            ? {
                ...item,
                title: title.trim(),
                link: link.trim(),
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

  const handleCardCheck = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <Breadcrumbs folders={[]} page="Dashboard" />
        {/* <div className="mb-8">
          <div className="text-3xl font-bold text-gray-900 mb-2">Dashboard</div>
          <p className="text-gray-600">Manage your links and folders</p>
        </div> */}

        <div className="mt-4 mb-8 bg-white/95 backdrop-blur-md border border-red-200/50 rounded-xl shadow-lg shadow-red-100/30 p-6">
          <Toolbar
            data={data}
            setSearch={setSearch}
            setFolder={setFolders}
            filter={filter}
            setFilter={setFilter}
            onAddLink={addLink}
          />
        </div>

        {folders.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Folders
              </h2>
              <span className="text-sm text-gray-600 font-medium bg-gradient-to-r from-red-50 to-red-100 px-3 py-1 rounded-lg border border-red-200/60">
                {folders.length} folder{folders.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {folders.map(({ id, name }, index) => (
                <Folders
                  key={index}
                  id={id}
                  title={name}
                  setFolder={setFolders}
                />
              ))}
            </div>
          </div>
        )}

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
            {searchableItems.map(
              ({ id, folderId, title, link, domain, openedCount }, index) => (
                <Card
                  key={index}
                  id={id}
                  folderName={folders.find((f) => f.id === folderId)?.name}
                  folderId={folderId}
                  title={title}
                  link={link}
                  domain={domain}
                  openedCount={openedCount}
                  onClick={() => handleCardCheck(id)}
                  onEdit={editCard}
                  onDelete={() => deleteCard(id)}
                  editableCard={editableCard}
                  folders={folders}
                  onSave={onSave}
                  checked={checked[id] || false}
                  onUpdateLinkCount={updateCount}
                  onMoveToFolder={async (id: string, folderId: string) => {
                    await moveLinkToFolder(id, folderId);
                    const updatedData = data.map((link) =>
                      link.id === id ? { ...link, folderId } : link,
                    );
                    setData(updatedData);
                    setSearch(updatedData);
                  }}
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
