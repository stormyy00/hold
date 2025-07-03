export type LinkProps = {
  id: string;
  title: string;
  folderId?: string | null;
  link: string;
  description?: string;
  domain: string;
  openedCount: number;
};

export type folderProps = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
};

export type EditableCardType = {
  id: string;
  title: string;
  link: string;
};

export interface CardsProps {
  id: string;
  title: string;
  link: string;
  domain: string;
  openedCount: number;
  folderName?: string;
  folderId?: string;
  folders?: folderProps[];
  checked?: boolean;
  onClick?: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  editableCard?: EditableCardType | null;
  onSave: (id: string | null, title?: string, link?: string) => void;
  onUpdateLinkCount: (id: string) => void;
  onMoveToFolder?: (id: string, folderId: string) => void;
}
