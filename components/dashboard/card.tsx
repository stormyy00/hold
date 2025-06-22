import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CardsProps } from "@/types";

const Cards = ({
  id,
  title,
  link,
  domain,
  openedCount,
  status,
  checked,
  onClick,
  onEdit,
  onDelete,
  editableCard,
  onSave,
  onUpdateLinkCount,
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
      className={`w-full max-w-sm shadow-md rounded-md p-4 hover:shadow-lg transition duration-200 cursor-pointer ${
        checked ? "ring-2 ring-blue-500 bg-blue-50" : ""
      }`}
      onClick={onClick}
    >
      {status && STATUS_STYLES[status] && (
        <div
          className={`text-xs font-medium px-2 py-0.5 rounded-sm w-fit mb-2 ${STATUS_STYLES[status].color}`}
        >
          {STATUS_STYLES[status].label}
        </div>
      )}
      <CardHeader className="flex items-center justify-between p-0 pb-2">
        <div className="flex gap-2 justify-between w-full px-1 items-center">
          <div className="flex items-center gap-2 flex-grow min-w-0">
            {link && (
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}`}
                alt="favicon"
                className="w-4 h-4 flex-shrink-0"
              />
            )}
            {isEditing ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-sm font-semibold flex-grow min-w-0"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="text-sm font-semibold text-gray-700 truncate">
                {title}
              </span>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <Button
                  variant={"outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave(id, editTitle, editLink);
                  }}
                  className="text-green-500 hover:text-green-700 text-xs px-2 py-1 rounded border"
                >
                  Save
                </Button>
                <Button
                  variant={"outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditTitle(title);
                    setEditLink(link);
                    onSave(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xs px-2 py-1 rounded border"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Edit
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(id);
                  }}
                  className="w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer"
                />
                <Trash
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                  }}
                  className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex justify-between p-0">
        {isEditing ? (
          <Input
            value={editLink}
            onChange={(e) => setEditLink(e.target.value)}
            placeholder="https://example.com"
            className="h-8 text-sm placeholder:text-gray-500"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="h-8 flex items-center">
            <Link
              href={link}
              onClick={() => onUpdateLinkCount(id, openedCount)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 truncate block"
            >
              {link}
            </Link>
          </div>
        )}
        <div className="flex items-center text-xs gap-1 text-gray-500 mt-1">
          <Eye size={16} /> <p>{openedCount}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;

export const STATUS_STYLES: Record<string, { label: string; color: string }> = {
  Saved: { label: "📌 Saved", color: "bg-yellow-100 text-yellow-800" },
  Visited: { label: "👀 Visited", color: "bg-blue-100 text-blue-800" },
  Archived: { label: "📁 Archived", color: "bg-green-100 text-green-800" },
};
