import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/firebase.js"; // Make sure to provide the correct path to your Firebase instance
import { MdLogout, MdModeEdit } from "react-icons/md";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import "./admin.scss";

function Admin() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign out error", error);
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    };

    fetchUsers();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDelete = (userToDelete) => {
    // Logic to delete user
    console.log("Delete user:", userToDelete);
  };

  const handleView = (userToView) => {
    // Logic to view user
    console.log("View user:", userToView);
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
          {activeTab === "employees" && (
            <div className="employee-cards">
              {users.map((user) => (
                <EmployeeCard
                  key={user.id}
                  user={user}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))}
            </div>
          )}
          {activeTab === "editCompanies" && <h2>Edit Companies Content</h2>}
          {activeTab === "notifications" && <h2>Notifications Content</h2>}
          {activeTab === "notes" && <h2>Notes/To-Do Content</h2>}
          {activeTab === "adminUsers" && <h2>Admin Users Content</h2>}
        </div>
      </div>
    </div>
  );
}

export default Admin;
