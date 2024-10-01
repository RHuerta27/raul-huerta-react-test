// ProductEdit.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts, updateProduct } from '../slices/productsSlice';
import { AppDispatch } from '../store'; 
import styles from '../styles/Products.module.scss';

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    getProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      await dispatch(updateProduct(product)); 
      navigate('/products'); 
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Editar Producto</h2>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Categoría:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>
  );
};

export default ProductEdit;
