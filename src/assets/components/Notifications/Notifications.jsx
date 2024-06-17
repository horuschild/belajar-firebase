import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/firebase.js";
import { RiPassExpiredFill, RiContactsBook2Line } from "react-icons/ri";
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
      <div className="notif-wrapper">
        <div className="expired-users-list">
          <h2>Expired Licenses</h2>
          {expiredUsers.map((user) => (
            <div key={user.id} className="expired-user-item">
              <div className="notif-icon">
                <RiPassExpiredFill />
              </div>
              <div className="notif-info">
                <h3>{user.name} ({user.companyName})</h3>
                <p>Simper License expired on {user.expiDate}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="not-filled-user-list">
          <h2>Uncompleted Data</h2>
          {expiredUsers.map((user) => (
            <div key={user.id} className="expired-user-item">
              <div className="notif-icon">
                <RiContactsBook2Line />
              </div>
              <div className="notif-info">
                <h3>{user.name} {user.companyName}</h3>
                <p>Simper License expired on {user.expiDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
