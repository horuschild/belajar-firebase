import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../components/firebase.js";
import UserDetailPopup from "../../components/PopUp/UserDetailPopup/UserDetailPopup.jsx";
import DeleteConfirmationPopup from "../../components/PopUp/DeleteConfirmationPopup/DeleteConfirmationPopup";
import { MdRemoveRedEye, MdOutlineDeleteOutline } from "react-icons/md";
import "./Employees.scss";

function Employees() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => !user.isAdmin); // Exclude users with isAdmin true
      setUsers(userData);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    try {
      await deleteDoc(doc(db, "users", user.id));
      setUsers(users.filter((u) => u.id !== user.id));
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteRequest = (user) => {
    setUserToDelete(user);
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.expiDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="employee-table">
      <input
        type="text"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Expiration Date</th>
            <th>Company</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <img
                    src={
                      "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    }
                    alt={`${user.name}'s profile`}
                    className="avatar"
                  />
                  <strong>{user.name}</strong>
                </div>
              </td>
              <td>{user.expiDate}</td>
              <td>{user.companyName}</td>
              <td>
                <button onClick={() => handleView(user)}>
                  <MdRemoveRedEye />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteRequest(user)}
                >
                  <MdOutlineDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UserDetailPopup user={selectedUser} onClose={handleClosePopup} />
      )}
      {userToDelete && (
        <DeleteConfirmationPopup
          user={userToDelete}
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Employees;
