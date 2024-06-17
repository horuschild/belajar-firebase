// UserDetailPopup.jsx
import React from "react";
import "./UserDetailPopup.scss";

function UserDetailPopup({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="user-detail-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="user-details">
          <h2>{user.name}</h2>
          <p>Company: {user.companyName}</p>
          <p>Email: {user.email}</p>
          <p>Experience Date: {user.expiDate}</p>
        </div>
        <div className="id-card-placeholder">
          <p>SIMPER Picture Not Uploaded</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPopup;
