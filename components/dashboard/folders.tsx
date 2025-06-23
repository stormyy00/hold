import { Folder as Fold, MoreVertical } from "lucide-react";
import { Card } from "../ui/card";

const Folders = ({ title, onDelete, onEdit, OnSave }) => {
  return (
    <Card
      onClick={() => {}}
      className="bg-transparent w-full shadow-md rounded-md p-2 hover:shadow-lg transition duration-200 cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="flex text-lg items-center font-semibold gap-2">
          <Fold size={20} className="text-gray-400" />
          {title}
        </div>
        <MoreVertical
          onClick={() => {
            console.log("More options clicked for:", title);
          }}
          className="cursor-pointer z-10"
          size={20}
        />
      </div>

      {/* <Folder
            title={title}
            link={link}
            domain={domain}
            openedCount={openedCount}
            onEdit={onEdit}
            onDelete={onDelete}
            editableCard={editableCard}
            onSave={onSave}
            checked={checked}
          /> */}
    </Card>
  );
};

export default Folders;
