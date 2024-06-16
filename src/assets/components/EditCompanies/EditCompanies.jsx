import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { MdDelete } from "react-icons/md";
import "./EditCompanies.scss";

function EditCompanies() {
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    const companySnapshot = await getDocs(collection(db, "companyNames"));
    const companyData = companySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCompanies(companyData);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async () => {
    if (companyName.trim() === "") return;
    try {
      await addDoc(collection(db, "companyNames"), {
        name: companyName,
      });
      setCompanyName("");
      fetchCompanies();
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      await deleteDoc(doc(db, "companyNames", companyId));
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div className="edit-companies-content">
      <h2>Edit Companies</h2>
      <div className="add-company">
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <button onClick={handleAddCompany}>Add Company</button>
      </div>
      <ul className="company-list">
        {companies.map((company) => (
          <li key={company.id} className="company-item">
            <span>{company.name}</span>
            <button onClick={() => handleDeleteCompany(company.id)}>
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditCompanies;
