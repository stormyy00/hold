import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import {
  // Edit,
  // Eye,
  // Trash,
  // FolderArchive,
  // FolderTree,
  SortDesc,
  SortAsc,
  ArrowRightLeft,
} from "lucide-react";
import { flexRender, Table as TableType } from "@tanstack/react-table";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import TooltipComponent from "./tooltip";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";

interface LinkTableProps<TData> {
  table: TableType<TData>;
  // editableCard?: any;
  // folders: Array<{ id: string; name: string }>;
  // onEdit?: (id: string) => void;
  // onDelete?: (id: string) => void;
  // onSave?: (id: string | null, title?: string, url?: string) => void;
  // onUpdateLinkCount?: (id: string) => void;
  // onMoveToFolder?: (linkId: string, folderId: string) => void;
}

const LinkTable = <TData,>({
  table,
  // editableCard,
  // folders,
  // onEdit,
  // onDelete,
  // onSave,
  // onUpdateLinkCount,
  // onMoveToFolder,
}: LinkTableProps<TData>) => {
  // const [editTitle, setEditTitle] = useState("");
  // const [editLink, setEditLink] = useState("");
  // const [editDropdownOpen, setEditDropdownOpen] = useState<string | null>(null);

  // useEffect(() => {
  //   if (editableCard) {
  //     setEditTitle(editableCard.title);
  //     setEditLink(editableCard.url);
  //     setEditDropdownOpen(editableCard.id);
  //   } else {
  //     setEditDropdownOpen(null);
  //   }
  // }, [editableCard]);

  // const handleEditSave = (rowId: string) => {
  //   onSave?.(rowId, editTitle, editLink);
  //   setEditDropdownOpen(null);
  // };

  // const handleEditCancel = (rowData: any) => {
  //   setEditTitle(rowData.title);
  //   setEditLink(rowData.link);
  //   onSave?.(null);
  //   setEditDropdownOpen(null);
  // };

  // const renderCell = (cell: any) => {
  //   const rowData = cell.row.original as any;
  //   console.log("Rendering cell for row:", rowData.id);
  //   const columnId = cell.column.id;
  //   const cellValue = cell.getValue();

  //   switch (columnId) {
  //     case "title":
  //       return (
  //         <div className="flex items-center gap-3">
  //           {rowData.url && (
  //             <div className="w-6 h-6 flex-shrink-0 rounded-md overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center">
  //               <img
  //                 src={`https://www.google.com/s2/favicons?domain=${rowData.domain}&size=32`}
  //                 alt="favicon"
  //                 className="w-4 h-4"
  //               />
  //             </div>
  //           )}
  //           <Link
  //             href={rowData.url}
  //             onClick={() => onUpdateLinkCount?.(rowData.id)}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="text-sm font-semibold text-gray-800 hover:text-red-600 transition-colors duration-200"
  //           >
  //             {cellValue}
  //           </Link>
  //           {rowData.folderId && (
  //             <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-red-500 text-white shadow-sm">
  //               <FolderTree size={12} className="mr-1" />
  //               <span className="truncate max-w-16">{rowData.folderName}</span>
  //             </div>
  //           )}
  //         </div>
  //       );

  //     case "domain":
  //       return (
  //         <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md font-medium w-fit">
  //           <TooltipComponent
  //             content={cellValue}
  //             icon=""
  //             text={
  //               cellValue && cellValue.length > 9
  //                 ? cellValue.endsWith(".com")
  //                   ? `${cellValue.substring(0, 12)}...com`
  //                   : `${cellValue.substring(0, 12)}...${cellValue.slice(-3)}`
  //                 : cellValue
  //             }
  //             copy
  //           />
  //         </div>
  //       );

  //     case "openedCount":
  //       return (
  //         <TooltipComponent
  //           content="Times Opened"
  //           icon={<Eye size={14} />}
  //           text={cellValue?.toString() || "0"}
  //         />
  //       );

  //     case "options":
  //       return (
  //         <div className="flex items-center gap-1">
  //           <DropdownMenu
  //             open={editDropdownOpen === rowData.id}
  //             onOpenChange={(open) => {
  //               if (!open) {
  //                 setEditDropdownOpen(null);
  //               } else {
  //                 setEditDropdownOpen(rowData.id);
  //                 onEdit?.(rowData.id);
  //               }
  //             }}
  //           >
  //             <DropdownMenuTrigger asChild>
  //               <div className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-200 group/edit">
  //                 <Edit className="w-4 h-4 text-blue-500 group-hover/edit:text-blue-600 cursor-pointer transition-colors duration-200" />
  //               </div>
  //             </DropdownMenuTrigger>
  //             <DropdownMenuContent className="w-80 p-0" align="center">
  //               <div className="p-4 space-y-3">
  //                 <div className="flex items-center gap-2 text-sm font-medium text-gray-700 border-b pb-2">
  //                   <Edit size={14} />
  //                   <span>Edit Link</span>
  //                 </div>

  //                 <div className="space-y-2">
  //                   <label className="text-xs font-medium text-gray-600">
  //                     Title
  //                   </label>
  //                   <Input
  //                     value={editTitle}
  //                     onChange={(e) => setEditTitle(e.target.value)}
  //                     className="text-sm font-semibold border-blue-200 focus:ring-blue-400 focus:border-blue-400"
  //                     placeholder="Enter title"
  //                     onClick={(e) => e.stopPropagation()}
  //                   />
  //                 </div>

  //                 <div className="space-y-2">
  //                   <label className="text-xs font-medium text-gray-600">
  //                     URL
  //                   </label>
  //                   <Input
  //                     value={editLink}
  //                     onChange={(e) => setEditLink(e.target.value)}
  //                     placeholder="https://example.com"
  //                     className="text-sm border-blue-200 focus:ring-blue-400 focus:border-blue-400"
  //                     onClick={(e) => e.stopPropagation()}
  //                   />
  //                 </div>

  //                 <div className="flex items-center gap-2 pt-2 border-t">
  //                   <Button
  //                     variant="outline"
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       handleEditSave(rowData.id);
  //                     }}
  //                     className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 text-xs py-2 rounded-lg border-green-200 shadow-sm"
  //                   >
  //                     Save Changes
  //                   </Button>
  //                   <Button
  //                     variant="outline"
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       handleEditCancel(rowData);
  //                     }}
  //                     className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 text-xs py-2 rounded-lg border-gray-200 shadow-sm"
  //                   >
  //                     Cancel
  //                   </Button>
  //                 </div>
  //               </div>
  //             </DropdownMenuContent>
  //           </DropdownMenu>

  //           <div className="p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200 group/delete">
  //             <Trash
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 onDelete?.(rowData.id);
  //               }}
  //               className="w-4 h-4 text-red-500 group-hover/delete:text-red-600 cursor-pointer transition-colors duration-200"
  //             />
  //           </div>

  //           <div className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-200 group/move">
  //             <DropdownMenu>
  //               <DropdownMenuTrigger className="flex items-center p-1 text-blue-500 group-hover/move:text-blue-600 cursor-pointer transition-colors duration-200">
  //                 <FolderArchive className="w-4 h-4" />
  //               </DropdownMenuTrigger>
  //               <DropdownMenuContent className="w-48">
  //                 {folders.map(({ id: folderId, name }) => (
  //                   <div
  //                     key={folderId}
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       onMoveToFolder?.(rowData.id, folderId);
  //                     }}
  //                     className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
  //                   >
  //                     {name}
  //                   </div>
  //                 ))}
  //               </DropdownMenuContent>
  //             </DropdownMenu>
  //           </div>
  //         </div>
  //       );

  //     default:
  //       return flexRender(cell.column.columnDef.cell, cell.getContext());
  //   }
  // };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-visible">
      <Table className="border-collapse w-full">
        <TableHeader className=" bg-white/90 backdrop-blur-lg rounded-t-2xl shadow">
          {table.getHeaderGroups().map(({ id, headers }) => (
            <TableRow key={id} className="w-full">
              {headers.map(({ id, column, getContext, getSize }) => (
                <TableHead
                  key={id}
                  width={() => getSize()}
                  className="py-3 px-8 text-base font-semibold text-gray-700 bg-white first:rounded-tl-2xl last:rounded-tr-2xl"
                >
                  <div className="flex items-center gap-1 justify-center w-1/3">
                    {flexRender(column.columnDef.header, getContext())}
                    {column.getCanSort() && (
                      <button
                        onClick={column.getToggleSortingHandler()}
                        className="ml-1 text-gray-400 hover:text-red-400 transition"
                        aria-label="Toggle sort"
                      >
                        {column.getIsSorted() === "asc" && (
                          <SortAsc size={18} />
                        )}
                        {column.getIsSorted() === "desc" && (
                          <SortDesc size={18} />
                        )}
                        {!column.getIsSorted() && (
                          <ArrowRightLeft size={18} className="opacity-60" />
                        )}
                      </button>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map(
                ({ id, original: rowData, getIsSelected, getVisibleCells }) => {
                  const isSelected = getIsSelected();
                  const isInFolder = rowData.folderId;

                  return (
                    <TableRow
                      key={id}
                      data-state={isSelected && "selected"}
                      className={`
                      border-b border-gray-100 hover:bg-gray-50/80 transition-colors cursor-pointer
                      ${isSelected ? "ring-2 ring-red-300 bg-red-50/50 border-red-200" : ""}
                      ${isInFolder ? "!border-l-4 !border-l-red-400" : ""}
                    `}
                    >
                      {getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-6 py-4 text-sm text-gray-900  text-center"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                },
              )
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.columns.length}
                className="h-24 text-center text-gray-500"
              >
                No Links found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LinkTable;
