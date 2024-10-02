import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID del producto de la URL
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  if (!product) {
    return <div>Producto no encontrado.</div>; // Manejo de error
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      <img src={product.image} alt={product.title} />
      {/* Aquí puedes agregar un formulario para editar el producto si lo deseas */}
    </div>
  );
};

export default ProductDetails;
