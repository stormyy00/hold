import { Edit, Folder as Fold, MoreVertical, Trash } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import {
  useDeleteFolderMutation,
  useUpdateFolderMutation,
} from "@/server/actions/folders";

type FolderProps = {
  id: string;
  title: string;
};
const slugify = (text: string): string => {
  return text
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
};

const Folders = ({ id, title }: FolderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(title);
  const router = useRouter();
  const { mutate: deleteFolder } = useDeleteFolderMutation();
  const { mutate: updateFolder } = useUpdateFolderMutation();

  return (
    <Card
      onClick={() =>
        router.push(`/folders/${id}-${slugify(title.toLowerCase())}`)
      }
      className="group bg-white border border-gray-200/60 shadow-sm hover:shadow-xl hover:shadow-red-100/30 rounded-xl p-3 transition-all duration-300 cursor-pointer hover:border-red-200/70"
    >
      <div className="flex justify-between items-center">
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={async () => {
              setIsEditing(false);
              updateFolder({ id, name });
            }}
            className="border-red-200 focus:ring-red-400 focus:border-red-400 text-sm font-semibold"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="flex items-center gap-2 flex-grow min-w-0">
            <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-500 rounded-md flex items-center justify-center shadow-sm">
              <Fold size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800 truncate transition-colors duration-200 hover:text-red-600">
              {title}
            </span>
          </div>
        )}

        <div className="flex-shrink-0 ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 opacity-60 group-hover:opacity-100">
                <MoreVertical size={16} className="text-gray-600" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 bg-white border border-gray-200 shadow-lg rounded-lg">
              <DropdownMenuLabel className="text-sm font-semibold text-gray-700 px-3 py-2">
                Options
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100" />
              <div className="p-1">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md cursor-pointer transition-colors duration-200 outline-none"
                >
                  <Edit size={16} className="text-blue-500" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async (e) => {
                    e.stopPropagation();
                    deleteFolder(id);
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-md cursor-pointer transition-colors duration-200 outline-none"
                >
                  <Trash size={16} className="text-red-500" />
                  Delete
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default Folders;
