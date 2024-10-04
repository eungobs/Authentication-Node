import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Delete.css';

function Delete({ navigate, isAdmin, loginAsAdmin }) {
  const [employees, setEmployees] = useState([]);
  const [adminName, setAdminName] = useState('');

  // Fetch employees from Firebase
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesCollection = collection(db, 'employees');
        const employeesSnapshot = await getDocs(employeesCollection);
        const employeesList = employeesSnapshot.docs.map(doc => ({ 
          id: doc.id, // Use document ID
          ...doc.data() 
        }));
        setEmployees(employeesList);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
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
      await deleteDoc(doc(db, 'employees', employeeId)); // Delete from Firebase
      const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
      setEmployees(updatedEmployees);
      
      // Notify the active employees page
      alert(`Employee with ID ${employeeId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee. Please try again later.');
    }
  };

  return (
    <div className="delete">
      <h2>Delete Employee</h2>
      <div className="employee-list">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
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
