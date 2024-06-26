// DeleteConfirmationPopup.jsx
import React from "react";
import "./DeleteConfirmationPopup.scss";

function DeleteConfirmationPopup({ user, onConfirm, onCancel }) {
  if (!user) return null;

  return (
    <div className="delete-confirmation-popup">
      <div className="popup-content">
        <p>Are you sure you want to delete {user.name}?</p>
        <div className="buttons">
          <button className="delete-btn" onClick={() => onConfirm(user)}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
