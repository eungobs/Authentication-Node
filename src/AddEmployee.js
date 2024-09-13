import React, { useState } from 'react';
import './AddEmployee.css';

function AddEmployee({ navigate }) {
  // State variables for storing form input values
  const [name, setName] = useState(''); // Employee's name
  const [position, setPosition] = useState(''); // Employee's position
  const [image, setImage] = useState(''); // URL of the employee's image
  const [refNumber, setRefNumber] = useState(''); // Employee's reference number
  const [email, setEmail] = useState(''); // Employee's email address
  const [idNumber, setIdNumber] = useState(''); // Employee's ID number
  const [phoneNumber, setPhoneNumber] = useState(''); // Employee's phone number
  // eslint-disable-next-line no-unused-vars
  const [imageFile, setImageFile] = useState(null); // File object for the image, currently not used

  // Function to handle image file selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image URL for preview
        setImageFile(file); // Store the file object (not used in current code)
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Function to handle the submission of the new employee
  const handleAddEmployee = () => {
    // Validate ID number length
    if (idNumber.length > 13) {
      alert('ID number must not exceed 13 digits');
      return;
    }

    // Validate phone number length
    if (phoneNumber.length > 10) {
      alert('Phone number must not exceed 10 digits');
      return;
    }

    // Create a new employee object with current state values
    const newEmployee = {
      id: Date.now(), // Generate a unique ID using current timestamp
      name,
      position,
      image,
      refNumber,
      email,
      idNumber,
      phoneNumber,
    };

    // Retrieve the existing employees from local storage
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    // Add the new employee to the existing list
    const updatedEmployees = [...storedEmployees, newEmployee];
    // Save the updated employee list back to local storage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // Navigate back to the active employees page
    navigate('active-employees');
  };

  // Function to handle navigation back to the active employees page
  const handleBack = () => {
    navigate('active-employees'); // Navigate to the active employees page
  };

  return (
    <div className="add-employee">
      <h2>Add Employee</h2>
      <form>
        {/* Form fields for employee details */}
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Position:
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
        </label>
        <label>
          Image Upload:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <label>
          Reference Number:
          <input type="text" value={refNumber} onChange={(e) => setRefNumber(e.target.value)} />
        </label>
        <label>
          Email Address:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          ID Number:
          <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
        </label>
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        {/* Button to trigger employee addition */}
        <button type="button" onClick={handleAddEmployee}>Add Employee</button>
        {/* Button to navigate back to the active employees page */}
        <button type="button" onClick={handleBack}>Back to Active Employees</button>
      </form>
    </div>
  );
}

export default AddEmployee;
