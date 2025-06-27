"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Folder, SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Folder = {
  id: number | string;
  name: string;
};

type BreadcrumbsProps = {
  folders: Folder[];
  page?: string;
  showDropdown?: boolean;
};

const Breadcrumbs = ({
  folders,
  page = "",
  showDropdown,
}: BreadcrumbsProps) => {
  const pathname = usePathname();

  let folderId = null;
  let folderName = null;

  if (pathname.startsWith("/folders/")) {
    const folderParam = pathname.split("/folders/")[1];
    folderId = folderParam?.split("-")[0];

    const numericFolderId = parseInt(folderId, 10);
    folderName =
      folders.find((f) => f.id === numericFolderId || f.id === folderId)
        ?.name || "Folder";
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {folderId && (
          <>
            <BreadcrumbItem>
              {showDropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <Folder size={16} />
                    {folderName}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="min-w-[180px] max-w-[250px] p-1"
                    sideOffset={4}
                  >
                    {folders.map(({ id, name }) => (
                      <DropdownMenuItem
                        key={id}
                        className={`cursor-pointer rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                          id === folderId || id === parseInt(folderId, 10)
                            ? "bg-accent font-medium"
                            : ""
                        }`}
                        asChild
                      >
                        <Link
                          href={`/folders/${id}-${name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex items-center gap-2 w-full"
                        >
                          <Folder size={14} />
                          <span className="truncate">{name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    href={`/folders/${folderId}-${folderName.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Folder size={16} className="mr-1" />
                    {folderName}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            <BreadcrumbSeparator />
          </>
        )}

        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
