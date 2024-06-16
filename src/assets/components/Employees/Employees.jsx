// Employees.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../components/firebase.js";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import UserDetailPopup from "../../components/PopUp/UserDetailPopup/UserDetailPopup.jsx";
import DeleteConfirmationPopup from "../../components/PopUp/DeleteConfirmationPopup/DeleteConfirmationPopup";
import "./Employees.scss";

function Employees() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

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

  return (
    <div className="employee-cards">
      {users.map((user) => (
        <EmployeeCard
          key={user.id}
          user={user}
          onDelete={handleDeleteRequest}
          onView={handleView}
        />
      ))}
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
