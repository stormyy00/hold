import FolderDashboard from "@/components/folders/folder-dashboard";
import {
  getFolderById,
  getFolderByNameId,
  getFolders,
} from "@/server/queries/folder";
import React from "react";

type PageProps = {
  folder: string;
};
const page = async ({ params }: { params: PageProps }) => {
  const paramValue = params.folder;
  if (!paramValue) throw new Error("Expected param missing");

  const parts = paramValue.split("-");
  const id = parts.slice(0, 5).join("-");

  const { result, status, message } = await getFolderById(id);
  if (status === 200) {
  } else {
    console.error(message);
  }
  const res = await getFolderByNameId(id);
  const folders = await getFolders();

  return (
    <FolderDashboard
      content={result}
      title={res?.result?.[0]?.folderName || "Untitled Folder"}
      folderId={id}
      folders={folders?.result}
    />
  );
};

export default page;
