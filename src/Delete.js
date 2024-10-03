import React, { useState, useEffect } from 'react';
import './Delete.css';
import { db } from './firebaseConfig'; // Ensure the path to your firebase config is correct
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

function Delete({ navigate, isAdmin, loginAsAdmin }) {
  const [employees, setEmployees] = useState([]);
  const [adminName, setAdminName] = useState('');

  // Fetch employees from Firestore
  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesCollection = collection(db, 'employees'); // Adjust the collection name
      const employeeSnapshot = await getDocs(employeesCollection);
      const employeeList = employeeSnapshot.docs.map(doc => ({
        id: doc.id, // Use Firestore document ID
        ...doc.data(),
      }));
      setEmployees(employeeList);
    };

    fetchEmployees();
  }, []);

  const handleLogin = () => {
    if (adminName.toLowerCase() === 'elizabeth ndzukule') {
      loginAsAdmin(true);
    } else {
      alert('Access Denied');
    }
  };

  if (!isAdmin) {
    return (
      <div className="delete">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Enter Admin Name"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={() => navigate('active-employees')}>Back</button>
      </div>
    );
  }

  const handleDelete = async (employeeId) => {
    try {
      await deleteDoc(doc(db, 'employees', employeeId)); // Delete employee from Firestore
      setEmployees(employees.filter(employee => employee.id !== employeeId));
      alert(`Employee with ID ${employeeId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again later.');
    }
  };

  return (
    <div className="delete">
      <h2>Delete Employee</h2>
      <div className="employee-list">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <img src={employee.imageUrl} alt={employee.name} /> {/* Assuming you have an image URL in the employee data */}
            <h3>{employee.name}</h3>
            <p>{employee.position}</p>
            <p>{employee.refNumber}</p>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('active-employees')}>Back</button>
    </div>
  );
}

export default Delete;
