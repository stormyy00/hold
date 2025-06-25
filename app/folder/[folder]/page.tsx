import FolderDashboard from "@/components/folders/folder-dashboard";
import React from "react";

type PageProps = {
  folder: string;
};
const page = ({ params }: { params: PageProps }) => {
  const [id, ...folder] = params.folder.split("-");
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold">{folder}</h1>
      <FolderDashboard folderId={id} />
    </div>
  );
};

export default page;
