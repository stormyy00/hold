import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Trash, FolderArchive, FolderTree } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CardsProps } from "@/types";
import TooltipComponent from "./tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Cards = ({
  id,
  title,
  link,
  domain,
  openedCount,
  folderName,
  folderId,
  folders,
  checked,
  onClick,
  onEdit,
  onDelete,
  editableCard,
  onSave,
  onUpdateLinkCount,
  onMoveToFolder,
}: CardsProps) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editLink, setEditLink] = useState(link);

  const isEditing = editableCard && editableCard.id === id;

  useEffect(() => {
    if (isEditing && editableCard) {
      setEditTitle(editableCard.title);
      setEditLink(editableCard.link);
    } else {
      setEditTitle(title);
      setEditLink(link);
    }
  }, [isEditing, editableCard, title, link]);

  return (
    <Card
      className={`group w-full max-w-sm bg-white border border-gray-200/60 shadow-sm hover:shadow-lg hover:shadow-red-100/20 rounded-lg p-3 transition-all duration-300 cursor-pointer hover:border-red-200/70 hover:-translate-y-0.5 relative ${
        checked
          ? "ring-2 ring-red-400 bg-gradient-to-br from-red-50/80 to-red-100/40 border-red-300/50 shadow-lg shadow-red-200/30"
          : ""
      } ${folderId ? "hover:ring-[.5px] hover:ring-red-300/50" : ""}`}
      onClick={onClick}
    >
      {folderId && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-red-600 rounded-l-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      {folderId && (
        <div className="absolute -top-3 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
          <div className="flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-red-500 text-white shadow-lg backdrop-blur-sm">
            <FolderTree size={12} className="mr-1" />
            <span className="truncate max-w-16">{folderName}</span>
          </div>
        </div>
      )}

      <CardHeader className="flex items-center justify-between p-0 pb-3">
        <div className="flex gap-3 justify-between w-full items-center">
          <div className="flex items-center gap-3 flex-grow min-w-0">
            {link && (
              <div className="w-6 h-6 flex-shrink-0 rounded-md overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&size=32`}
                  alt="favicon"
                  className="w-4 h-4"
                />
              </div>
            )}
            {isEditing ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-sm font-semibold flex-grow min-w-0 border-red-200 focus:ring-red-400 focus:border-red-400"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <Link
                href={link}
                onClick={() => onUpdateLinkCount(id)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-800 truncate flex-grow min-w-0 hover:text-red-600 transition-colors duration-200"
              >
                {title}
              </Link>
            )}
          </div>

          <div className="flex gap-1 flex-shrink-0">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave(id, editTitle, editLink);
                  }}
                  className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 text-xs px-3 py-1.5 rounded-lg border-green-200 shadow-sm"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditTitle(title);
                    setEditLink(link);
                    onSave(null);
                  }}
                  className="bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 text-xs px-3 py-1.5 rounded-lg border-gray-200 shadow-sm"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <div className="flex items-center">
                <div className="p-1 rounded-lg hover:bg-blue-100 transition-colors duration-200 group/edit">
                  <Edit
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(id);
                    }}
                    className="w-4 h-4 text-blue-500 group-hover/edit:text-blue-600 cursor-pointer transition-colors duration-200"
                  />
                </div>
                <div className="p-1 rounded-lg hover:bg-red-100 transition-colors duration-200 group/delete">
                  <Trash
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(id);
                    }}
                    className="w-4 h-4 text-red-500 group-hover/delete:text-red-600 cursor-pointer transition-colors duration-200"
                  />
                </div>
                <div className="p- rounded-lg hover:bg-blue-100 transition-colors duration-200 group/move">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center p-1 pt-1.5  text-blue-500 group-hover/move:text-blue-600 cursor-pointer transition-colors duration-200">
                      <FolderArchive className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      {folders.map(({ id: folderId, name }) => (
                        <div
                          key={folderId}
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoveToFolder(id, folderId);
                          }}
                          className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                        >
                          {name}
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {isEditing ? (
          <Input
            value={editLink}
            onChange={(e) => setEditLink(e.target.value)}
            placeholder="https://example.com"
            className="h-9 text-sm placeholder:text-gray-500 border-red-200 focus:ring-red-400 focus:border-red-400 mb-3"
            onClick={(e) => e.stopPropagation()}
          />
        ) : null}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <TooltipComponent
              content="Times Opened"
              icon={<Eye size={14} className="text-gray-500" />}
              text={openedCount.toString()}
            />
          </div>

          {domain && !isEditing && (
            <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md font-medium">
              <TooltipComponent
                content={domain}
                icon={""}
                text={
                  domain.length > 9
                    ? domain.endsWith(".com")
                      ? `${domain.substring(0, 12)}...com`
                      : `${domain.substring(0, 12)}...${domain.slice(-3)}`
                    : domain
                }
                copy
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;

export const STATUS_STYLES: Record<string, { label: string; color: string }> = {
  Saved: {
    label: "📌 Saved",
    color:
      "bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-700 border border-amber-200/50",
  },
  Visited: {
    label: "👀 Visited",
    color:
      "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200/50",
  },
  Archived: {
    label: "📁 Archived",
    color:
      "bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 border border-emerald-200/50",
  },
};
