import React from "react";
import Card from "./card";
import Toolbar from "./toolbar";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Toolbar />
      <Card />
    </div>
  );
};

export default Dashboard;
