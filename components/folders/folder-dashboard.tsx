import React, { useEffect, useState } from "react";
import FolderToolbar from "./folder-toolbar";
import FolderCard from "./folder-card";
import { getFolderById } from "@/server/queries/folder";

const FolderDashboard = ({}) => {
  const [data, setData] = useState([]);
  const getFolders = async () => {
    const { result, status, message } = await getFolderById(folderId);
    if (status === 200) {
      setData(result);
    } else {
      console.error(message);
    }
  };
  useEffect(() => {
    getFolders();
  }, []);
  return (
    <div>
      <FolderToolbar />

      <FolderCard />
    </div>
  );
};

export default FolderDashboard;
