// Admin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { MdLogout } from "react-icons/md";
import Employees from "../../components/Employees/Employees";
import EditCompanies from "../../components/EditCompanies/EditCompanies";
import "./admin.scss";

function Admin() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-wrapper">
      <nav className="nav-admin">
        <h3>EMDB Admin</h3>
        <button onClick={handleSignOut}>
          Sign Out <MdLogout className="logout-icon" />
        </button>
      </nav>
      <div className="tab-container">
        <div className="tabs">
          <div
            className={`tab-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => handleTabChange("dashboard")}
          >
            Dashboard
          </div>
          <div
            className={`tab-item ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => handleTabChange("employees")}
          >
            Employees
          </div>
          <div
            className={`tab-item ${
              activeTab === "editCompanies" ? "active" : ""
            }`}
            onClick={() => handleTabChange("editCompanies")}
          >
            Edit Companies
          </div>
          <div
            className={`tab-item ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => handleTabChange("notifications")}
          >
            Notifications
          </div>
          <div
            className={`tab-item ${activeTab === "notes" ? "active" : ""}`}
            onClick={() => handleTabChange("notes")}
          >
            Notes/To-Do
          </div>
          <div
            className={`tab-item ${activeTab === "adminUsers" ? "active" : ""}`}
            onClick={() => handleTabChange("adminUsers")}
          >
            Manage Admin
          </div>
        </div>
        <div className="tab-content">
          {activeTab === "dashboard" && <h2>Dashboard Content</h2>}
          {activeTab === "employees" && <Employees />}
          {activeTab === "editCompanies" && <EditCompanies />}
          {activeTab === "notifications" && <h2>Notifications Content</h2>}
          {activeTab === "notes" && <h2>Notes/To-Do Content</h2>}
          {activeTab === "adminUsers" && <h2>Admin Users Content</h2>}
        </div>
      </div>
    </div>
  );
}

export default Admin;
