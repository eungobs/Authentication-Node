import React, { useState, useEffect } from 'react';
import './ActiveEmployees.css';

function ActiveEmployees({ navigate }) {
  // State to hold the list of employees
  const [employees, setEmployees] = useState([]);

  // useEffect hook to load employee data from local storage when the component mounts
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      const parsedEmployees = JSON.parse(storedEmployees);
      setEmployees(parsedEmployees);
    }
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

  return (
    <div className="active-employees">
      {/* Header section with navigation buttons */}
      <header>
        <button onClick={() => navigate('add-employee')}>Add</button> {/* Navigate to the add employee page */}
        <button onClick={handleDelete}>Delete</button> {/* Navigate to the delete page */}
        <button onClick={() => navigate('personnel')}>Personnel</button> {/* Navigate to the personnel page */}
        <button onClick={handleLogout}>Logout</button> {/* Log out and navigate to the login page */}
      </header>

      {/* Main heading for the active employees page */}
      <h2>Active Employees</h2>

      {/* Container for displaying the list of employees */}
      <div className="employee-list">
        {employees.map((employee, index) => (
          <div key={index} className="employee-card">
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
        ))}
      </div>
    </div>
  );
}

export default ActiveEmployees;
