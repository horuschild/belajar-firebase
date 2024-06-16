import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../components/firebase";
import "./ManageAdmin.scss";

function ManageAdmin() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [nonAdminUsers, setNonAdminUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showAddAdminPopup, setShowAddAdminPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAdminUsers();
    fetchNonAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const adminUsersData = usersSnapshot.docs
        .filter((doc) => doc.data().isAdmin)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setAdminUsers(adminUsersData);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  const fetchNonAdminUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const nonAdminUsersData = usersSnapshot.docs
        .filter((doc) => !doc.data().isAdmin)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setNonAdminUsers(nonAdminUsersData);
    } catch (error) {
      console.error("Error fetching non-admin users:", error);
    }
  };

  const handleGrantAdminRole = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        isAdmin: true,
      });
      alert("Admin role granted successfully!");
      fetchAdminUsers();
      fetchNonAdminUsers(); // Update non-admin users list after granting admin role
      handleCloseAddAdminPopup(); // Close the popup after making admin
    } catch (error) {
      console.error("Error granting admin role:", error);
      alert("Failed to grant admin role.");
    }
  };

  const handleRevokeAdminRole = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        isAdmin: false,
      });
      alert("Admin role revoked successfully!");
      fetchAdminUsers();
      fetchNonAdminUsers(); // Update non-admin users list after revoking admin role
    } catch (error) {
      console.error("Error revoking admin role:", error);
      alert("Failed to revoke admin role.");
    }
  };

  const handleOpenAddAdminPopup = () => {
    setShowAddAdminPopup(true);
  };

  const handleCloseAddAdminPopup = () => {
    setShowAddAdminPopup(false);
    setSelectedUserId(null);
    setSearchTerm(""); // Clear search term when closing popup
  };

  const handleSelectUser = async (userId) => {
    setSelectedUserId(userId);
    await handleGrantAdminRole(userId); // Grant admin role immediately upon selection
  };

  // Filter non-admin users based on search term
  const filteredNonAdminUsers = nonAdminUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-admin">
      <h2>Manage Admin</h2>
      <div className="admin-list">
        <h3>Admin Users:</h3>
        <ul>
          {adminUsers.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => handleRevokeAdminRole(user.id)}>
                Revoke Admin
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-admin-button">
        <button onClick={handleOpenAddAdminPopup}>Add Admin</button>
      </div>
      {showAddAdminPopup && (
        <div className="add-admin-popup">
          <h3>Select a user to grant admin privileges:</h3>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="user-list">
            <ul>
              {filteredNonAdminUsers.map((user) => (
                <li key={user.id}>
                  {user.name}
                  <button onClick={() => handleSelectUser(user.id)}>
                    Make Admin
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="admin-cancel" onClick={handleCloseAddAdminPopup}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageAdmin;
