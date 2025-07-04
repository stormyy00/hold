import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";

type DialogBoxProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string, url: string) => void;
  isPending: boolean;
};

const DialogBox = ({ open, onClose, onAdd, isPending }: DialogBoxProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    link: "",
  });

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateInputs = () => {
    const newErrors = {
      title: "",
      link: "",
    };

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!link.trim()) {
      newErrors.link = "Link is required";
    } else if (!isValidUrl(link.trim())) {
      newErrors.link = "Please enter a valid URL (e.g., https://example.com)";
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.link;
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
  };

  const handleLinkChange = (value: string) => {
    setLink(value);
    if (errors.link) {
      setErrors((prev) => ({ ...prev, link: "" }));
    }
  };

  useEffect(() => {
    if (open) {
      setTitle("");
      setLink("");
      setErrors({ title: "", link: "" });
    }
  }, [open]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl border-0">
        <DialogHeader className="pb-0">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add a Link
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            Add a new link to your collection. Provide a title and a link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="space-y-1">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter title"
              className={`text-sm h-10 border rounded-md px-3 py-2 bg-white ${
                errors.title
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              } focus:outline-none transition-colors`}
            />
            {errors.title && (
              <div className="text-red-500 text-xs mt-1">{errors.title}</div>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="link" className="text-sm font-medium text-gray-700">
              Link
            </Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => handleLinkChange(e.target.value)}
              placeholder="https://example.com"
              className={`text-sm h-10 border rounded-md px-3 py-2 bg-white ${
                errors.link
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              } focus:outline-none transition-colors`}
            />
            {errors.link && (
              <div className="text-red-500 text-xs mt-1">{errors.link}</div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-1">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              if (validateInputs()) {
                onAdd(title.trim(), link.trim());
                setTitle("");
                setLink("");
                setErrors({ title: "", link: "" });
              }
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
