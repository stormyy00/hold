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
import { useState, useEffect } from "react";

interface FolderDialogProps {
  popup: {
    title: string;
    text: string;
    color: string;
    visible: boolean;
    button: string;
  };
  setPopup: (popup: { visible: boolean; button?: string }) => void;
  onCreate: (folderName: string) => void;
  isPending?: boolean;
}

const FolderDialog = ({
  popup,
  setPopup,
  onCreate,
  isPending,
}: FolderDialogProps) => {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!folderName.trim()) {
      setError("Folder name is required");
      return;
    }
    onCreate(folderName.trim());
    setPopup({ ...popup, visible: false });
    setFolderName("");
    setError("");
  };

  const handleCancel = () => {
    setPopup({ ...popup, visible: false });
    setFolderName("");
    setError("");
  };

  useEffect(() => {
    if (popup.visible) {
      setFolderName("");
      setError("");
    }
  }, [popup.visible]);

  return (
    <AlertDialog open={popup.visible}>
      <AlertDialogContent className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl border-0">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="text-xl font-semibold text-gray-900">
            Create Folder
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600 mt-1">
            Create a new folder to organize your links
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <div className="space-y-2">
            <Label
              htmlFor="folder-name"
              className="text-sm font-medium text-gray-700"
            >
              Folder Name
            </Label>
            <Input
              id="folder-name"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="Enter folder name"
              className={`text-sm h-10 border rounded-md px-3 py-2 bg-white ${
                error
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              } focus:outline-none transition-colors`}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isPending && folderName.trim()) {
                  handleCreate();
                }
              }}
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        </div>

        <AlertDialogFooter className="flex justify-end gap-1 pt-2">
          <AlertDialogCancel
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending || !folderName.trim()}
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Creating..." : popup.button}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FolderDialog;
