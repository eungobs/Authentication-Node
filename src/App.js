import React, { useState } from 'react';
import Login from './Login';
import Admin from './Admin'; // Page for managing admin functionalities
import ActiveEmployees from './ActiveEmployees'; // Page for viewing active employees
import AddEmployee from './AddEmployee'; // Page for adding new employees
import EditProfile from './EditProfile'; // Page for editing the user's profile
import Personnel from './Personnel'; // Page for personnel management
import Delete from './Delete'; // Page for deleting employees
import Logout from './Logout'; // Page for logging out
import Loader from './Loader'; // Loader component to show while loading
import AddAdmin from './AddAdmin'; // Page for adding new admins
import AdminProfile from './AdminProfile'; // Page for viewing admin profile details
import './App.css'; // CSS styles for the application

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // State to manage the current page being displayed

  const [isAdmin, setIsAdmin] = useState(false); // State to track if the logged-in user is an admin
  const [loading, setLoading] = useState(false); // State to show loader while navigating between pages

  // Function to set the admin status
  const loginAsAdmin = (status) => {
    setIsAdmin(status);
  };

  // Function to handle navigation between pages
  const navigate = (page) => {
    setLoading(true); // Start loading animation
    setTimeout(() => {
      setCurrentPage(page); // Update the current page
      setLoading(false); // Stop loading animation
    }, 500); // Simulate a loading delay of 500ms
  };

  // Function to render the appropriate page based on the currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'admin':
        return <Admin navigate={navigate} />; // Render Admin page
      case 'login':
        return <Login navigate={navigate} loginAsAdmin={loginAsAdmin} />; // Render Login page
      case 'active-employees':
        return <ActiveEmployees navigate={navigate} />; // Render Active Employees page
      case 'add-employee':
        return <AddEmployee navigate={navigate} />; // Render Add Employee page
      case 'edit-profile':
        return <EditProfile navigate={navigate} />; // Render Edit Profile page
      case 'personnel':
        return <Personnel navigate={navigate} />; // Render Personnel Management page
      case 'delete':
        return <Delete navigate={navigate} isAdmin={isAdmin} loginAsAdmin={loginAsAdmin} />; // Render Delete page
      case 'logout':
        return <Logout navigate={navigate} />; // Render Logout page
      case 'add-admin': // New case for Add Admin page
        return <AddAdmin navigate={navigate} />; // Render Add Admin page
      case 'admin-profile': // New case for Admin Profile page
        return <AdminProfile navigate={navigate} />; // Render Admin Profile page
      default:
        return <Login navigate={navigate} loginAsAdmin={loginAsAdmin} />; // Default to Login page
    }
  };

  return (
    <div className="App">
      {loading && <Loader />} {/* Show loader while loading */}
      {renderPage()} {/* Render the current page */}
    </div>
  );
}

export default App;
