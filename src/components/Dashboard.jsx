import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
   localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
