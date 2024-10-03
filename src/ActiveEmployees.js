import React, { useState, useEffect } from 'react';
import './ActiveEmployees.css';
import { db } from './firebaseConfig'; // Firebase configuration
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore methods

function ActiveEmployees({ navigate }) {
  // State to hold the list of employees
  const [employees, setEmployees] = useState([]);

  // useEffect hook to load employee data from Firestore when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesCollection = collection(db, 'employees'); // Access the 'employees' collection
        const employeeSnapshot = await getDocs(employeesCollection); // Get documents from the collection
        const employeeList = employeeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map to get id and data
        
        // Store fetched employees in state
        setEmployees(employeeList); // Update state with the fetched employees
        
        // Store employees in localStorage (optional)
        localStorage.setItem('employees', JSON.stringify(employeeList));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    
    // Fetch employees when the component mounts
    fetchEmployees();

    // Optional: Load employees from localStorage if available
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      const parsedEmployees = JSON.parse(storedEmployees);
      setEmployees(parsedEmployees);
    }
  }, []); // Empty dependency array ensures this runs only on component mount

  // Handler function to log out the user
  const handleLogout = () => {
    alert('Logged out successfully!');
    localStorage.removeItem('employees'); // Clear local storage on logout
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

  // Handler function to delete an employee
  const handleEmployeeDelete = async (employeeId) => {
    try {
      await deleteDoc(doc(db, 'employees', employeeId)); // Delete the employee from Firestore
      setEmployees(employees.filter(emp => emp.id !== employeeId)); // Update local state
      alert('Employee deleted successfully!');

      // Update local storage after deletion
      const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee.');
    }
  };

  return (
    <div className="active-employees">
      {/* Header section with navigation buttons */}
      <header>
        <button onClick={() => navigate('add-employee')}>Add</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate('personnel')}>Personnel</button>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {/* Main heading for the active employees page */}
      <h2>Active Employees</h2>

      {/* Container for displaying the list of employees */}
      <div className="employee-list">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <img
              src={employee.image || 'default-image-url-here'} // Fallback image if employee.image is not available
              alt={`${employee.name}`} // Alt text for the image
              style={{ width: '100px', height: '100px' }} // Styling for the image size
            />
            <h3>{employee.name}</h3>
            <p>Position: {employee.position}</p>
            <p>Email: {employee.email || 'N/A'}</p>
            <p>ID Number: {employee.idNumber || 'N/A'}</p>
            <p>Phone Number: {employee.phoneNumber || 'N/A'}</p>
            <p>Ref Number: {employee.refNumber}</p>
            <button onClick={() => handleEdit(employee.id)}>Edit</button>
            <button onClick={() => handleEmployeeDelete(employee.id)}>Delete</button> {/* Add delete button */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveEmployees;

