import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";
import { useState } from "react";

interface FolderDialogProps {
  popup: {
    visible: boolean;
    button: string;
  };
  setPopup: (popup: { visible: boolean; button?: string }) => void;
  onCreate: (folderName: string) => void;
}

const FolderDialog = ({ popup, setPopup, onCreate }: FolderDialogProps) => {
  const [folderName, setFolderName] = useState("");
  return (
    <AlertDialog open={popup.visible}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Folder</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new folder with the name
          </AlertDialogDescription>

          <Label htmlFor="folder-name" className="text-sm font-medium">
            Folder Name
          </Label>
          <Input
            id="folder-name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
            className="text-sm mt-2"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setPopup({ ...popup, visible: false })}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onCreate(folderName);
              setPopup({ ...popup, visible: false });
              setFolderName("");
            }}
          >
            {popup.button}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FolderDialog;
