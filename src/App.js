import React, { useState } from 'react';
import Login from './Login';
import Admin from './Admin'; // Replaced Signup with Admin
import ActiveEmployees from './ActiveEmployees';
import AddEmployee from './AddEmployee';
import EditProfile from './EditProfile';
import Personnel from './Personnel';
import Delete from './Delete';
import Logout from './Logout';
import Loader from './Loader'; 
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); 

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false); // State for the loader

  const loginAsAdmin = (status) => {
    setIsAdmin(status);
  };

  const navigate = (page) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 500); // Simulating a loading delay
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'admin': // Replaced 'signup' with 'admin'
        return <Admin navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} loginAsAdmin={loginAsAdmin} />;
      case 'active-employees':
        return <ActiveEmployees navigate={navigate} />;
      case 'add-employee':
        return <AddEmployee navigate={navigate} />;
      case 'edit-profile':
        return <EditProfile navigate={navigate} />;
      case 'personnel':
        return <Personnel navigate={navigate} />;
      case 'delete':
        return <Delete navigate={navigate} isAdmin={isAdmin} loginAsAdmin={loginAsAdmin} />;
      case 'logout':
        return <Logout navigate={navigate} />;
      default:
        return <Login navigate={navigate} loginAsAdmin={loginAsAdmin} />;
    }
  };

  return (
    <div className="App">
      {loading && <Loader />}
      {renderPage()}
    </div>
  );
}

export default App;
