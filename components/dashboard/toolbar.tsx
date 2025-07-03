import { useState } from "react";
import { FolderPlus, Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import DialogBox from "./dialog";
import FolderDialog from "./folderDialog";
import { useAddFolderMutation } from "@/server/actions/folders";

interface ToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddLink: (value: { link: string; title: string }) => void;
}

const Toolbar = ({ searchValue, onSearchChange, onAddLink }: ToolbarProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [popup, setPopup] = useState({
    title: "",
    text: "",
    color: "",
    visible: false,
    button: "",
  });

  const { mutate: addFolder } = useAddFolderMutation();
  // const handleStatus = (status: string) => {
  //   setFilter(status);
  //   setSearch(
  //     status === "all"
  //       ? data
  //       : data.filter((item) => item.status.toLowerCase() === status),
  //   );
  // };

  const confirmFolder = () => {
    setPopup({
      title: "Create Folder",
      text: "Enter a name for the new folder.",
      color: "blue",
      visible: true,
      button: "Create",
    });
  };

  return (
    <div className="flex flex-row items-center gap-2 w-11/12">
      <div className="relative w-full flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search links..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-sm"
        />
      </div>
      <Button variant="outline" onClick={() => setShowDialog(true)}>
        <Plus size={16} />
      </Button>
      <Button onClick={confirmFolder} variant={"outline"}>
        <FolderPlus size={16} />
        <span>Create Folder</span>
      </Button>
      <div className="flex gap-2 flex-wrap w-full">
        {STATUSES.map(({ status, bg, text, border, label }) => (
          <button
            key={status}
            // onClick={() => handleStatus(status)}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium shadow-sm transform hover:-rotate-1 transition-all duration-200 border ${bg} ${text} ${border}`}
          >
            {label}
          </button>
        ))}
      </div>
      <DialogBox
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onAdd={(title: string, link: string) => {
          onAddLink({ title, link });
          setShowDialog(false);
        }}
      />

      <FolderDialog
        popup={popup}
        setPopup={setPopup}
        onCreate={(folderName) => addFolder(folderName)}
      />
    </div>
  );
};

export default Toolbar;

export const STATUSES = [
  {
    status: "all",
    label: "All",
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-300",
  },
  {
    status: "saved",
    label: "Saved",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
  },
  {
    status: "visited",
    label: "Visited",
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  {
    status: "archived",
    label: "Archived",
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
  },
];
