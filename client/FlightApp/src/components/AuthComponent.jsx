import  { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../redux/api/authApi';

const AuthComponent = () => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await register({ email, password }).unwrap();
      console.log('Registration successful:', response);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthComponent;
