import { Edit, Folder as Fold, MoreVertical, Trash } from "lucide-react";
import { Card } from "../ui/card";
import { deleteFolder, updateFolder } from "@/server/queries/folder";
import { useState, Dispatch, SetStateAction } from "react";
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

interface Folder {
  id: string;
  name: string;
  [key: string]: any;
}

type FolderProps = {
  id: string;
  title: string;
  setFolder: Dispatch<SetStateAction<Folder[]>>;
};

const Folders = ({ id, title, setFolder }: FolderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(title);
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/folder/${id}`)}
      className="bg-transparent w-full shadow-md rounded-md p-2 hover:shadow-lg transition duration-200 cursor-pointer"
    >
      <div className="flex justify-between">
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={async () => {
              setIsEditing(false);
              await updateFolder(id, name);
              setFolder((prev) =>
                prev.map((item) => {
                  if (item.id === id) {
                    return { ...item, name: name };
                  }
                  return item;
                }),
              );
            }}
          />
        ) : (
          <div className="flex text-lg items-center font-semibold gap-2 ">
            <Fold size={20} className="text-gray-400 " />
            <span className="text-sm font-semibold text-gray-700 truncate transition duration-300 hover:text-blue-400">
              {title}
            </span>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuLabel className="text-sm font-semibold">
              Options
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-2 ml-1">
              <DropdownMenuItem
                onClick={() => {
                  setIsEditing(true);
                }}
                className="text-gray-500 hover:opacity-80 cursor-pointer flex items-center gap-2"
              >
                <Edit size={16} /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  await deleteFolder(id);
                  setFolder((prev) => prev.filter((item) => item.id !== id));
                }}
                className="text-red-500 hover:opacity-80 cursor-pointer flex items-center gap-2"
              >
                <span>
                  <Trash size={16} />
                </span>{" "}
                Delete
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default Folders;
