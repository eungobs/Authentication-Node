import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication methods

function Login({ navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const adminCredentials = [
      { email: 'elizabeth.ndzukule@gmail.com', password: '000000' }, // Super Admin
      { email: 'kaogelomahajane@gmail.com', password: '111111' }, // Admin 1
      { email: 'elizabe@gmail.com', password: '222222' }, // Admin 2
    ];

    const isAdmin = adminCredentials.some(
      (admin) => admin.email === username && admin.password === password
    );

    if (isAdmin) {
      try {
        // Use Firebase to sign in
        await signInWithEmailAndPassword(auth, username, password);
        navigate('active-employees'); // Navigate to the active employees page
      } catch (error) {
        setError('Login failed. Please try again later.');
        console.error('Error during login:', error.message);
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login">
      <h1>Teekga Electrical (Pty) LTD</h1>
      <input 
        type="email" 
        placeholder="User name" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button onClick={handleLogin}>Login</button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;


