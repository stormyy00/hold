import FolderDashboard from "@/components/folders/folder-dashboard";

import React from "react";

type PageProps = {
  folder: string;
};
const page = ({ params }: { params: PageProps }) => {
  const paramValue = params.folder;
  if (!paramValue) throw new Error("Expected param missing");

  const parts = paramValue.split("-");
  const folderId = parts.slice(0, 5).join("-");

  return <FolderDashboard folderId={folderId} />;
};

export default page;
