// src/AdminProfile.js
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import './AdminProfile.css';

const AdminProfile = () => {
    const [admins, setAdmins] = useState([]); // State to hold the list of admins

    // Fetch admins from Firestore when the component mounts
    useEffect(() => {
        const loadAdmins = async () => {
            const adminSnapshot = await getDocs(collection(db, "admins")); // Fetch admins from Firestore
            const adminsArray = [];
            adminSnapshot.forEach((doc) => {
                adminsArray.push({ id: doc.id, ...doc.data() });
            });
            setAdmins(adminsArray); // Set the state with the fetched admin data
        };

        loadAdmins(); // Call the function when the component mounts
    }, []); // Empty dependency array ensures this runs only on component mount

    return (
        <div>
            <h2>Admin Profile</h2>
            {/* Display the admin details */}
            <div className="admin-list">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <div key={admin.id} className="admin-card">
                            <img
                                src={admin.imageUrl || 'default-image-url-here'} // Fallback image if imageUrl is not available
                                alt={`${admin.name} ${admin.surname}`} // Alt text for the image
                                style={{ width: '150px', height: '150px', borderRadius: '50%' }} // Profile image styling
                            />
                            <h3>{`${admin.name} ${admin.surname}`}</h3>
                            <p>ID Number: {admin.idNumber || 'N/A'}</p>
                            <p>Age: {admin.age || 'N/A'}</p>
                            <p>Role: {admin.role || 'N/A'}</p>
                        </div>
                    ))
                ) : (
                    <p>No admins found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
