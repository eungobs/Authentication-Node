import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import './AddAdmin.css';

const AddAdmin = ({ navigate }) => {  // Accept navigate prop from App.js
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('admin');
    const [image, setImage] = useState(null);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const loadAdmins = async () => {
            const adminSnapshot = await getDocs(collection(db, "admins"));
            const adminsArray = [];
            adminSnapshot.forEach((doc) => {
                adminsArray.push({ id: doc.id, ...doc.data() });
            });
            setAdmins(adminsArray);
        };

        loadAdmins();
    }, []);

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = '';
            if (image) {
                const storage = getStorage();
                const imageRef = ref(storage, `admins/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            const newAdmin = { name, surname, idNumber, age, role, imageUrl };
            const docRef = await addDoc(collection(db, "admins"), newAdmin);
            setAdmins((prev) => [...prev, { id: docRef.id, ...newAdmin }]);

            alert('Admin added successfully!');
            setName('');
            setSurname('');
            setIdNumber('');
            setAge('');
            setRole('admin');
            setImage(null);
        } catch (error) {
            console.error("Error adding admin: ", error);
            alert('Failed to add admin.');
        }
    };

    return (
        <div className="admin-container">
            <h2>Add Admin</h2>
            <form onSubmit={handleAddAdmin} className="small-form">
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Surname:</label>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                </div>
                <div>
                    <label>ID Number:</label>
                    <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="sysadmin">Sysadmin</option>
                    </select>
                </div>
                <div>
                    <label>Upload Picture:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit">Add Admin</button>
            </form>

            <h2>Admin List</h2>
            <div className="admin-list small-admin-list">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <div key={admin.id} className="admin-card small-admin-card">
                            <img src={admin.imageUrl || 'default-image-url-here'} alt={`${admin.name} ${admin.surname}`} />
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

            <div className="navigation-buttons">
                {/* Updated buttons to use the passed navigate prop */}
                <button onClick={() => navigate('admin-profile')}>Admin Profile</button>
                <button onClick={() => navigate('active-employees')}>Active Employees</button>
            </div>
        </div>
    );
};

export default AddAdmin;
