import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../slices/authSlice';
import { validateEmail, validatePassword } from '../utils/validators';
import styles from '../styles/Login.module.scss'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const defaultEmail = 'admin@gmail.com';
    const defaultPassword = 'Admin123$';

    if (!validateEmail(email)) {
      setError('Correo electrónico no válido');
      return;
    }
    if (!validatePassword(password)) {
      setError('Contraseña no válida');
      return;
    }
    if (email === defaultEmail && password === defaultPassword) {
      dispatch(login(email));
      navigate('/products');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
