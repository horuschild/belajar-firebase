import React from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { RiDeleteBinLine, RiEyeLine } from "react-icons/ri";
import "./EmployeeCard.scss";

const EmployeeCard = ({ user, onDelete, onView }) => {
  const { name, companyName, expiDate } = user;

  const handleDeleteClick = () => {
    onDelete(user);
  };

  const handleViewClick = () => {
    onView(user);
  };

  return (
    <div className="employee-card">
      <div className="checkbox">
        <MdCheckBoxOutlineBlank />
      </div>
      <div className="user-info">
        <h2>{name}</h2>
        <p>{companyName}</p>
        <p>{expiDate}</p>
      </div>
      <div className="actions">
        <button onClick={handleViewClick}>
          <RiEyeLine />
        </button>
        <button onClick={handleDeleteClick}>
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
