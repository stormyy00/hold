import React, { useState } from "react";
import DialogBox from "../dashboard/dialog";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { AddLink } from "@/server/queries/getLinks";
import { LinkProps } from "@/types";

interface LinkItem {
  title: string;
  status?: string;
}

type toolbarProps = {
  data: LinkItem[];
  setSearch: React.Dispatch<React.SetStateAction<LinkItem[]>>;
  folderId: string;
};
const FolderToolbar = ({
  data,
  setSearch,
  folderId,
  // filter,
  // setFilter,
}: toolbarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // const handleStatus = (status: string) => {
  //   setFilter(status);
  //   setSearch(
  //     status === "all"
  //       ? data
  //       : data.filter((item) => item.status.toLowerCase() === status),
  //   );
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    const filtered = val
      ? data.filter(({ title }) =>
          title.toLowerCase().includes(val.toLowerCase()),
        )
      : data;
    setSearch(filtered);
  };

  const addLink = async ({ title, link }: { title: string; link: string }) => {
    if (!title || !link) {
      alert("Title and link cannot be empty");
      return;
    }
    try {
      const url = new URL(link);
      const domain = url.hostname.replace(/^www\./, "");
      const description = "";

      const { result } = await AddLink(
        title,
        description,
        link,
        domain,
        folderId,
      );

      const newItem: LinkProps = {
        id: result[0].id,
        title,
        link,
        description,
        domain,
        openedCount: 0,
      };

      const updatedData = [...data, newItem];
      setSearch(updatedData);
      setSearchValue("");
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2 w-11/12">
      <div className="relative w-full flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <Input
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search links..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-sm"
        />
      </div>
      <Button variant="outline" onClick={() => setShowDialog(true)}>
        <Plus size={16} />
      </Button>
      {/* <div className="flex gap-2 flex-wrap w-full">
        {STATUSES.map(({ status, bg, text, border, label }) => (
          <button
            key={status}
            onClick={() => handleStatus(status)}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium shadow-sm transform hover:-rotate-1 transition-all duration-200 border ${bg} ${text} ${border}`}
          >
            {label}
          </button>
        ))}
      </div> */}
      <DialogBox
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onAdd={(title: string, link: string) => {
          addLink({ title, link });
          setShowDialog(false);
        }}
      />
    </div>
  );
};

export default FolderToolbar;
