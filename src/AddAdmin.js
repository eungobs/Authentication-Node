// src/AddAdmin.js
import React, { useState } from 'react';
import { db } from './firebaseConfig'; // Import your Firebase configuration

const AddAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin'); // Default role is admin

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
            const newAdmin = { name, email, role };
            // Store the new admin in Firestore
            await db.collection('admins').add(newAdmin);
            alert('Admin added successfully!');
            setName('');
            setEmail('');
        } catch (error) {
            console.error("Error adding admin: ", error);
            alert('Failed to add admin.');
        }
    };

    return (
        <div>
            <h2>Add Admin</h2>
            <form onSubmit={handleAddAdmin}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="sysadmin">Sysadmin</option>
                    </select>
                </div>
                <button type="submit">Add Admin</button>
            </form>
        </div>
    );
};

export default AddAdmin;
