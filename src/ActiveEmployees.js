import React, { useState, useEffect } from 'react';
import './ActiveEmployees.css';
import { db } from './firebaseConfig'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import necessary Firestore methods

function ActiveEmployees({ navigate }) {
  // State to hold the list of employees
  const [employees, setEmployees] = useState([]);
  // State to hold the search query for employee ID
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect hook to load employee data from Firestore when the component mounts
  useEffect(() => {
    const loadEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "employees")); // Fetch employees from Firestore
      const employeesArray = [];
      querySnapshot.forEach((doc) => {
        employeesArray.push({ id: doc.id, ...doc.data() }); // Push each employee into the array
      });
      setEmployees(employeesArray); // Set the state with the fetched data
    };

    loadEmployees();
  }, []); // Empty dependency array ensures this runs only on component mount

  // Handler function to log out the user
  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('login'); // Navigate to the login page
  };

  // Handler function to navigate to the delete page
  const handleDelete = () => {
    navigate('delete');
  };

  // Handler function to navigate to the edit profile page for a specific employee
  const handleEdit = (employeeId) => {
    navigate('edit-profile', { employeeId });
  };

  // Handler function to navigate to the add admin page
  const handleAddAdmin = () => {
    navigate('add-admin'); // Navigate to the add admin page
  };

  // Handler function to navigate to the admin profile page
  const handleAdminProfile = () => {
    navigate('admin-profile'); // Navigate to the admin profile page
  };

  // Filter employees based on the search query
  const filteredEmployees = employees.filter((employee) =>
    employee.idNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="active-employees">
      {/* Header section with navigation buttons */}
      <header>
        <button onClick={() => navigate('add-employee')}>Add Employee</button> {/* Navigate to the add employee page */}
        <button onClick={handleDelete}>Delete</button> {/* Navigate to the delete page */}
        <button onClick={() => navigate('personnel')}>Personnel</button> {/* Navigate to the personnel page */}
        <button onClick={handleAddAdmin}>Add Admin</button> {/* Navigate to the add admin page */}
        <button onClick={handleAdminProfile}>Admin Profile</button> {/* Navigate to the admin profile page */}
        <button onClick={handleLogout}>Logout</button> {/* Log out and navigate to the login page */}
      </header>

      {/* Main heading for the active employees page */}
      <h2>Active Employees</h2>

      {/* Search input to filter employees by ID */}
      <input
        type="text"
        placeholder="Search by Employee ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query when input changes
        className="search-input"
      />

      {/* Container for displaying the list of employees */}
      <div className="employee-list">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div key={employee.id} className="employee-card">
              {/* Display employee image with fallback if not available */}
              <img
                src={employee.image || 'default-image-url-here'} // Fallback image if employee.image is not available
                alt={`${employee.name}`} // Alt text for the image
                style={{ width: '100px', height: '100px' }} // Styling for the image size
              />
              {/* Display employee details */}
              <h3>{employee.name}</h3> {/* Employee name */}
              <p>Position: {employee.position}</p> {/* Employee position */}
              <p>Email: {employee.email || 'N/A'}</p> {/* Display email, show 'N/A' if not available */}
              <p>ID Number: {employee.idNumber || 'N/A'}</p> {/* Display ID number, show 'N/A' if not available */}
              <p>Phone Number: {employee.phoneNumber || 'N/A'}</p> {/* Display phone number, show 'N/A' if not available */}
              <p>Ref Number: {employee.refNumber}</p> {/* Employee reference number */}
              <button onClick={() => handleEdit(employee.id)}>Edit</button> {/* Navigate to the edit profile page for the employee */}
            </div>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default ActiveEmployees;
