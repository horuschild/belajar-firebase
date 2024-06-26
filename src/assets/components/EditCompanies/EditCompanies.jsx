import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import {MdOutlineDeleteOutline } from "react-icons/md";
import DeleteConfirmationPopup from "../../components/PopUp/DeleteConfirmationPopup/DeleteConfirmationPopup.jsx";
import "./EditCompanies.scss";

function EditCompanies() {
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [companyToDelete, setCompanyToDelete] = useState(null);

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
      await addDoc(collection(db, "companyNames"), { name: companyName });
      setCompanyName("");
      fetchCompanies();
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const handleDeleteCompany = async (company) => {
    try {
      await deleteDoc(doc(db, "companyNames", company.id));
      fetchCompanies();
      setCompanyToDelete(null);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleDeleteRequest = (company) => {
    setCompanyToDelete(company);
  };

  const handleCancelDelete = () => {
    setCompanyToDelete(null);
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
      <div className="company-table">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>
                  <button onClick={() => handleDeleteRequest(company)}>
                    <MdOutlineDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {companyToDelete && (
        <DeleteConfirmationPopup
          user={companyToDelete}
          onConfirm={handleDeleteCompany}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default EditCompanies;
