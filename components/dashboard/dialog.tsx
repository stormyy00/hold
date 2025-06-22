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
  onAdd: (title: string, link: string) => void;
};

const DialogBox = ({ open, onClose, onAdd }: DialogBoxProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setLink("");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add a Link
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Add a new link to your collection. Provide a title and a link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              className="text-sm"
            />
          </div>
          {error && <div className="text-red-500 text-xs">{error}</div>}
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outline"
            className="text-green-600 border-green-600"
            onClick={() => {
              if (!title.trim() || !link.trim()) {
                setError("Please fill in both title and link.");
                return;
              }
              onAdd(title.trim(), link.trim());
              setTitle("");
              setLink("");
              setError("");
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
