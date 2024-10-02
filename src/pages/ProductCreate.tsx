import React, { useState } from 'react';
import { useAppDispatch } from '../store';
import { addProduct } from '../slices/productsSlice';
import styles from '../styles/Products.module.scss';
import { useNavigate } from 'react-router-dom';

const ProductCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !price || !description || !category) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      category,
      image: 'https://i.pravatar.cc',
    };
    
    try {
      await dispatch(addProduct(newProduct)).unwrap();
      navigate('/products');
    } catch (err: any) {
      setError('Hubo un error al agregar el producto.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />
      <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default ProductCreate;
