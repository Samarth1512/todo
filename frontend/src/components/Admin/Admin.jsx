// Admin.js
import React, { useState, useEffect } from "react";
import "./Admin.css"
import axios from "axios";
import UserCard from "./UserCard"; // Import the UserCard component

function Admin() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v2/getAllUserDetails");
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <div className="user-cards">
        {userDetails.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Admin;
