// src/AdminProfile.js
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig'; // Import your Firebase configuration

const AdminProfile = () => {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            const user = auth.currentUser; // Get currently logged-in user
            if (user) {
                const adminRef = db.collection('admins').where('email', '==', user.email);
                const snapshot = await adminRef.get();
                snapshot.forEach((doc) => {
                    setAdminData({ id: doc.id, ...doc.data() });
                });
            }
        };
        fetchAdminData();
    }, []);

    return (
        <div>
            <h2>Profile Details</h2>
            {adminData ? (
                <div>
                    <p><strong>Name:</strong> {adminData.name}</p>
                    <p><strong>Email:</strong> {adminData.email}</p>
                    <p><strong>Role:</strong> {adminData.role}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminProfile;
