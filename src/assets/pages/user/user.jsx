import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../components/firebase.js";
import { MdLogout, MdModeEdit } from "react-icons/md";
import "./user.scss";

function User() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    companyName: "",
    expiDate: "",
  });
  const [newUserData, setNewUserData] = useState({
    name: "",
    companyName: "",
    expiDate: "",
  });
  const [companyNames, setCompanyNames] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            name: data.name || "",
            companyName: data.companyName || "",
            expiDate: data.expiDate || "",
          });
          setNewUserData({
            name: data.name || "",
            companyName: data.companyName || "",
            expiDate: data.expiDate || "",
          });
        }
      }
    };

    const fetchCompanyNames = async () => {
      const companyCollection = await getDocs(collection(db, "companyNames"));
      const companyList = companyCollection.docs.map((doc) => doc.data().name);
      setCompanyNames(companyList);
    };

    fetchUserData();
    fetchCompanyNames();
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "users", user.uid), newUserData, { merge: true });
      setUserData(newUserData);
      setEditing(false);
    }
  };

  return (
    <section className="user-wrapper">
      <nav className="nav-user">
        <h3>EMDB</h3>
        <button onClick={handleSignOut}>
          Sign Out <MdLogout className="logout-icon" />
        </button>
      </nav>
      <div className="content">
        <div className="left-content">
          <h1>Welcome {userData.name}</h1>
          <div className="info-wrapper">
            <h3 className="info-title">Name</h3>
            {editing ? (
              <input
                type="text"
                name="name"
                value={newUserData.name}
                onChange={handleChange}
              />
            ) : (
              <h2 className="info">{userData.name}</h2>
            )}
            <h3 className="info-title">Company</h3>
            {editing ? (
              <select
                name="companyName"
                value={newUserData.companyName}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Please select a company
                </option>
                {companyNames.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            ) : (
              <h2 className="info">
                {userData.companyName || "Please input the data first"}
              </h2>
            )}
            <h3 className="info-title">License Expiration</h3>
            {editing ? (
              <input
                type="date"
                name="expiDate"
                value={newUserData.expiDate}
                placeholder="Please input the data first"
                onChange={handleChange}
              />
            ) : (
              <h2 className="info">
                {userData.expiDate || "Please input the data first"}
              </h2>
            )}
          </div>
          {editing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>
              Edit Data <MdModeEdit className="icon"/>
            </button>
          )}
        </div>
        <div className="right-content">
          <img src="" alt="" />
        </div>
      </div>
    </section>
  );
}

export default User;
