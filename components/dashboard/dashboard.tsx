"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Card from "./card";
import Toolbar from "./toolbar";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import Folders from "./folders";
import { Edit, Grid2x2Icon, Link, Table } from "lucide-react";
import Breadcrumbs from "../breadcrumb";
import { COLUMNS } from "@/data/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LinkTable from "./table";
import { useFolders, useLinks } from "@/server/actions/links";
import {
  useDeleteLinkMutation,
  useUpdateCountMutation,
  useUpdateLinkMutation,
} from "@/server/actions/add";
import { useMoveLinkToFolderMutation } from "@/server/actions/folders";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";

// interface FolderProps {
//   id: string;
//   name: string;
//   link: string;
//   domain: string;
//   openedCount: number;
//   userId: string;
//   createdAt: string;
// }

interface EditableCardState {
  id: string;
  title: string;
  url: string;
}

function useDebouncedValue<T>(value: T, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

const Dashboard = () => {
  const [searchValue, setSearch] = useState("");
  // const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<RowSelectionState>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [editableCard, setEditableCard] = useState<EditableCardState | null>(
    null,
  );
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { data: linksData, isLoading: isLinksLoading } = useLinks();
  const { data: folders, isLoading: isFoldersLoading } = useFolders();
  const { mutate: updateCount } = useUpdateCountMutation();
  const { mutate: updateLink } = useUpdateLinkMutation();
  const { mutate: deleteLink } = useDeleteLinkMutation();
  const { mutate: moveLinkToFolder } = useMoveLinkToFolderMutation();
  const debouncedSearch = useDebouncedValue(searchValue, 200);

  const searchableItems = useMemo(() => {
    if (!debouncedSearch.trim()) return linksData;
    return linksData.filter(({ title, url }) =>
      [title, url].some((field) =>
        field.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    );
  }, [debouncedSearch, linksData]);

  const table = useReactTable({
    data: searchableItems,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (_row) => true,
    onRowSelectionChange: setSelected,
    enableRowSelection: true,
    state: {
      rowSelection: selected,
    },
    meta: {
      onEdit: (id: string) => {
        const cardToEdit = linksData.find((item) => item.id === id);
        if (cardToEdit) {
          setEditableCard({
            id,
            title: cardToEdit.title,
            url: cardToEdit.url,
          });
          setEditModalOpen(true);
        }
      },
      onDelete: (id: string) => {
        deleteLink(id);
        const updatedChecked = { ...checked };
        delete updatedChecked[id];
        setChecked(updatedChecked);
      },
      onMoveToFolder: (id: string, folderId: string) => {
        moveLinkToFolder({ linkId: id, folderId });
        const updatedChecked = { ...checked };
        delete updatedChecked[id];
        setChecked(updatedChecked);
      },
      folders,
      updateLinkCount: (id: string) => {
        updateCount({ id });
      },
    },
  });

  // useEffect(() => {
  //   if (foldersdata) {
  //     setFolders(foldersdata);
  //   }
  // }, [foldersdata]);
  // useEffect(() => {
  //   initializeData();
  // }, []);

  // const initializeData = async () => {
  //   setIsLoading(true);
  //   await Promise.all([fetchFolders()]);
  //   setIsLoading(false);
  // };

  // const getLinks = async () => {
  //   try {
  //     const { result, status, message } = await GetLinks();
  //     if (status === 200 && result) {
  //       console.log("Links retrieved successfully:", result);
  //       setData(result);
  //       setSearch(result);
  //     } else {
  //       console.error("Error retrieving links:", message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch links:", error);
  //   }
  // };

  // const fetchFolders = async () => {
  //   try {
  //     const { result, status, message } = await getFolders();
  //     if (status === 200 && result) {
  //       console.log("Folders retrieved successfully:", result);
  //       setFolders(result);
  //     } else {
  //       console.error("Error retrieving folders:", message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch folders:", error);
  //   }
  // };

  // const addLink = async ({ title, link }: { title: string; link: string }) => {
  //   try {
  //     const domain = new URL(link).hostname.replace(/^www\./, "");
  //     const description = "";

  //     const newItem: LinkProps = {
  //       id: crypto.randomUUID(),
  //       title,
  //       link,
  //       description,
  //       domain,
  //       openedCount: 0,
  //     };

  //     const updatedData = [...data, newItem];
  //     setData(updatedData);
  //     setSearch(updatedData);

  //     const { result, status, message } = await AddLink(
  //       title,
  //       description,
  //       link,
  //       domain
  //     );

  //     if (status === 200) {
  //       console.log("Link added successfully:", result);

  //       if (result?.id) {
  //         const finalData = updatedData.map((item) =>
  //           item.id === newItem.id ? { ...item, id: result.id } : item
  //         );
  //         setData(finalData);
  //         setSearch(finalData);
  //       }
  //     } else {
  //       setData(data);
  //       setSearch(data);
  //       console.error("Failed to add link:", message);
  //     }
  //   } catch (error) {
  //     console.error("Error adding link:", error);
  //     setData(data);
  //     setSearch(data);
  //   }
  // };

  const deleteCard = async (id: string) => {
    deleteLink(id);
    const updatedChecked = { ...checked };
    delete updatedChecked[id];
    setChecked(updatedChecked);
  };

  // const updateCount = async (id: string, openedCount: number) => {
  //   try {
  //     const { status, message } = await updateLinkCount(id);
  //     if (status === 200) {
  //       console.log("Link count updated successfully");
  //       const updatedData = data.map((item) =>
  //         item.id === id ? { ...item, openedCount } : item
  //       );
  //       setData(updatedData);
  //       setSearch(updatedData);
  //     } else {
  //       console.error("Failed to update link count:", message);
  //     }
  //   } catch (error) {
  //     console.error("Error updating link count:", error);
  //   }
  // };

  const editCard = (id: string) => {
    const cardToEdit = linksData.find((item) => item.id === id);
    if (cardToEdit) {
      setEditableCard({
        id,
        title: cardToEdit.title,
        url: cardToEdit.url,
      });
    }
  };

  const onSave = useCallback(
    (id: string | null, title?: string, link?: string) => {
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
    },
    [linksData, setEditableCard],
  );

  const handleCardCheck = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <Breadcrumbs folders={[]} page="Dashboard" />
        {/* <div className="mb-8">
          <div className="text-3xl font-bold text-gray-900 mb-2">Dashboard</div>
          <p className="text-gray-600">Manage your links and folders</p>
        </div> */}

        <div className="mt-4 mb-8 bg-white/95 backdrop-blur-md border border-red-200/50 rounded-xl shadow-lg shadow-red-100/30 p-6">
          <Toolbar
            searchValue={searchValue}
            onSearchChange={(val) => setSearch(val)}
          />
        </div>

        {folders.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Folders
              </h2>
              <span className="text-sm text-gray-600 font-medium bg-gradient-to-r from-red-50 to-red-100 px-3 py-1 rounded-lg border border-red-200/60">
                {folders.length} folder{folders.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {folders.map(({ id, name }, index) => (
                <Folders key={index} id={id} title={name} />
              ))}
            </div>
          </div>
        )}
        <Tabs defaultValue="card">
          <div className="flex items-center justify-between mb-6">
            <div className="text-3xl font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Links
            </div>
            <TabsList className="bg-white border border-gray-200/80 shadow-sm">
              <TabsTrigger
                value="card"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-200/50 transition-all duration-200"
              >
                <Grid2x2Icon size={20} />
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-200/50 transition-all duration-200"
              >
                <Table size={20} />
              </TabsTrigger>
            </TabsList>
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
              <p className="text-gray-500">
                Add your first link to get started
              </p>
            </div>
          ) : (
            <>
              <TabsContent value="card">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {searchableItems.map(
                    (
                      { id, folderId, title, url, domain, openedCount },
                      index,
                    ) => (
                      <Card
                        key={index}
                        id={id}
                        folderName={
                          folders.find((f) => f.id === folderId)?.name
                        }
                        folderId={folderId}
                        title={title}
                        url={url}
                        domain={domain}
                        openedCount={openedCount}
                        onClick={() => handleCardCheck(id)}
                        onEdit={editCard}
                        onDelete={() => deleteCard(id)}
                        editableCard={editableCard}
                        folders={folders}
                        onSave={onSave}
                        checked={checked[id] || false}
                        onUpdateLinkCount={(id: string) => {
                          updateCount({ id });
                        }}
                        onMoveToFolder={(id, folderId) => {
                          moveLinkToFolder({ linkId: id, folderId });
                        }}
                      />
                    ),
                  )}
                </div>
              </TabsContent>
              <TabsContent value="list">
                <LinkTable
                  table={table}
                  // isLoading={isLinksLoading}
                  // onEdit={editCard}
                  // onDelete={deleteCard}
                  // onUpdateLinkCount={(id: string) => {
                  //   updateCount({ id });
                  // }}
                  // onMoveToFolder={(id, folderId) => {
                  //   moveLinkToFolder({ linkId: id, folderId });
                  // }}
                  // editableCard={editableCard}
                  // onSave={onSave}
                  // folders={folders}
                  // setEditableCard={setEditableCard}
                />
              </TabsContent>
            </>
          )}
          <Modal
            open={editModalOpen}
            editableCard={editableCard}
            setEditableCard={setEditableCard}
            onSave={onSave}
            setEditModalOpen={setEditModalOpen}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

const Modal = ({
  open,
  editableCard,
  setEditableCard,
  onSave,
  setEditModalOpen,
}) => {
  if (!editableCard) return null;

  return (
    <Dialog open={open} onOpenChange={setEditModalOpen}>
      <DialogContent className="bg-white p-6 rounded-lg w-full shadow-lg max-w-md mx-auto z-50">
        <DialogHeader className="flex items-center gap-2 text-sm font-medium text-gray-700 border-b pb-2 mb-3">
          <Edit size={16} />
          <span>Edit Link</span>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-medium text-gray-600">Title</Label>
            <Input
              value={editableCard.title}
              onChange={(e) =>
                setEditableCard({ ...editableCard, title: e.target.value })
              }
              className="text-sm font-semibold border-blue-200 focus:ring-blue-400 focus:border-blue-400 block w-full rounded px-2 py-1 mt-1"
              placeholder="Enter title"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-600">URL</Label>
            <Input
              value={editableCard.url}
              onChange={(e) =>
                setEditableCard({ ...editableCard, url: e.target.value })
              }
              placeholder="https://example.com"
              className="text-sm border-blue-200 focus:ring-blue-400 focus:border-blue-400 block w-full rounded px-2 py-1 mt-1"
            />
          </div>
        </div>
        <DialogFooter className="flex items-center gap-2 pt-4 border-t mt-4">
          <Button
            onClick={() => {
              onSave(editableCard.id, editableCard.title, editableCard.url);
              setEditModalOpen(false);
              setEditableCard(null);
            }}
            className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 text-xs py-2 rounded-lg border-green-200 shadow-sm"
          >
            Save Changes
          </Button>
          <Button
            onClick={() => {
              setEditModalOpen(false);
              setEditableCard(null);
            }}
            className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 text-xs py-2 rounded-lg border-gray-200 shadow-sm"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
