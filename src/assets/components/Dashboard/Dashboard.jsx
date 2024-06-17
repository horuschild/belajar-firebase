import React from "react";
import Employees from "../../components/Employees/Employees";
import EditCompanies from "../../components/EditCompanies/EditCompanies";
import NotesToDo from "../../components/NotesToDo/NotesToDo";
import ManageAdmin from "../../components/ManageAdmin/ManageAdmin";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-components">
        <Employees />
        <EditCompanies />
        <NotesToDo />
        <ManageAdmin />
      </div>
    </div>
  );
};

export default Dashboard;
