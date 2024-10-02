import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';
import ProductDetail from './pages/ProductDetails'; // Importa el componente ProductDetail
import { RootState } from './store'; 

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
        <Route path="/productcreate" element={isAuthenticated ? <ProductCreate /> : <Navigate to="/login" />} />
        <Route path="/productedit/:id" element={isAuthenticated ? <ProductEdit /> : <Navigate to="/login" />} />
        <Route path="/products/:id" element={isAuthenticated ? <ProductDetail /> : <Navigate to="/login" />} /> {/* Ruta para ProductDetail */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
