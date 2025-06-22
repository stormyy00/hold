export type EditableCardType = {
  id: string;
  title: string;
  link: string;
};

export interface CardsProps {
  id: string;
  title: string;
  link: string;
  status?: string;
  checked?: boolean;
  onClick?: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  editableCard?: EditableCardType | null;
  onSave: (id: string | null, title?: string, link?: string) => void;
}
