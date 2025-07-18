import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash, Eye, FolderTree, FolderArchive } from "lucide-react";
import { LinkProps } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipComponent from "@/components/dashboard/tooltip";
import Link from "next/link";

export const ColumnActions = ({
  row,
  onEdit,
  onDelete,
  onMoveToFolder,
  folders,
}) => (
  <div className="flex items-center gap-1 w-full">
    <div
      className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-200 group/edit"
      onClick={(e) => {
        e.stopPropagation();
        onEdit(row.id);
      }}
    >
      <Edit className="w-4 h-4 text-blue-500 group-hover/edit:text-blue-600 cursor-pointer transition-colors duration-200" />
    </div>
    <div className="p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200 group/delete">
      <Trash
        onClick={(e) => {
          e.stopPropagation();
          onDelete(row.id);
        }}
        className="w-4 h-4 text-red-500 group-hover/delete:text-red-600 cursor-pointer transition-colors duration-200"
      />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center p-1 text-blue-500 group-hover/move:text-blue-600 cursor-pointer transition-colors duration-200">
        <FolderArchive className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {folders.map(({ id: folderId, name }) => (
          <div
            key={folderId}
            onClick={(e) => {
              e.stopPropagation();
              onMoveToFolder(row.id, folderId);
            }}
            className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
          >
            {name}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export const COLUMNS: ColumnDef<LinkProps, keyof LinkProps>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row, getValue, table }) => {
      const value = getValue();
      const link = row.original;
      return (
        <div className="flex items-center gap-3 bg-red-200">
          {link.url && (
            <span className="w-7 h-7 flex-shrink-0 rounded-md overflow-hidden shadow border border-gray-200 bg-gray-50 flex items-center justify-center">
              <img
                src={`https://www.google.com/s2/favicons?domain=${link.domain}&size=32`}
                alt="favicon"
                className="w-4 h-4"
              />
            </span>
          )}
          {link.url ? (
            <Link
              href={link.url}
              onClick={() => table.options.meta?.updateLinkCount(link.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-gray-900 hover:text-red-600 transition-colors duration-200"
            >
              {value}
            </Link>
          ) : (
            <span className="text-base font-semibold text-gray-400">
              {value}
            </span>
          )}
          {link.folderId && (
            <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-red-500 text-white shadow-sm">
              <FolderTree size={12} className="mr-1" />
              <span className="truncate max-w-16">{link.folderName}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "domain",
    header: "Domain",
    cell: ({ getValue }) => (
      <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md font-medium w-fit">
        <TooltipComponent content={getValue()} icon="" text={getValue()} copy />
      </div>
    ),
  },
  {
    accessorKey: "openedCount",
    header: "Viewed",
    cell: ({ getValue }) => (
      <TooltipComponent
        content="Times Opened"
        icon={<Eye size={14} />}
        text={getValue()?.toString() || "0"}
        copy={false}
      />
    ),
  },
  {
    accessorKey: "options",
    header: "Options",
    enableSorting: false,
    cell: ({ row, table }) => (
      <div className="flex w-full justify-end items-center">
        <ColumnActions
          row={row.original}
          onEdit={table.options.meta?.onEdit}
          onDelete={table.options.meta?.onDelete}
          onMoveToFolder={table.options.meta?.onMoveToFolder}
          folders={table.options.meta?.folders || []}
        />
      </div>
    ),
  },
];
