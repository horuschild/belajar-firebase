// Notifications.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/firebase.js";
import "./Notifications.scss";

function Notifications() {
  const [expiredUsers, setExpiredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const currentDate = new Date();
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const expiredUsers = userData.filter(
        (user) => new Date(user.expiDate) < currentDate
      );
      setExpiredUsers(expiredUsers);
    };

    fetchUsers();
  }, []);

  return (
    <div className="notifications">
      <h2>Expired Licenses</h2>
      <ul className="expired-users-list">
        {expiredUsers.map((user) => (
          <li key={user.id} className="expired-user-item">
            <span>{user.name}</span>
            <span>{user.companyName}</span>
            <span>{user.expiDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
