import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, createUser } from '../slices/authSlice';
import { validateEmail, validatePassword } from '../utils/validators';
import styles from '../styles/Login.module.scss';

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultUser = {
    email: 'admin@gmail.com',
    password: 'Admin123$',
  };

  const users = useSelector((state: { auth: { users: User[] } }) => state.auth.users);

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setError('Correo electrónico no válido');
      return;
    }
    if (!validatePassword(password)) {
      setError('Contraseña no válida');
      return;
    }

    const existingUser = users.find(user => user.email === email && user.password === password) ||
                         (email === defaultUser.email && password === defaultUser.password && defaultUser);

    if (existingUser) {
      dispatch(login(email));
      navigate('/products');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleCreateAccount = () => {
    if (!validateEmail(email)) {
      setError('Correo electrónico no válido');
      return;
    }
    if (password.length < 6 || password.length > 12) {
      setError('La contraseña debe tener entre 6 y 12 caracteres');
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/.test(password)) {
      setError('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    dispatch(createUser({ email, password }));
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsCreatingAccount(false);
  };

  return (
    <div className={styles.loginContainer}>
      <h1>{isCreatingAccount ? 'Crear Cuenta' : 'Login'}</h1>
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
      {isCreatingAccount && (
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      <button onClick={isCreatingAccount ? handleCreateAccount : handleLogin}>
        {isCreatingAccount ? 'Crear Cuenta' : 'Ingresar'}
      </button>
      <p onClick={() => setIsCreatingAccount(!isCreatingAccount)} style={{ cursor: 'pointer', color: 'blue' }}>
        {isCreatingAccount ? 'Ya tengo una cuenta' : 'Crear una nueva cuenta'}
      </p>
    </div>
  );
};

export default Login;
