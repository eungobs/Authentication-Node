import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebaseConfig'; // Ensure the path is correct
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication methods

function Login({ navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (username === 'elizabeth.ndzukule@gmail.com' && password === '000000') {
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
