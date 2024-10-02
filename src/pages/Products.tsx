import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../slices/productsSlice';
import { RootState, AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import Pagination from '../components/Pagination';
import styles from '../styles/Products.module.scss';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); 
  const products = useSelector((state: RootState) => state.products.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string>('title');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortKey as keyof Product];
    const bValue = b[sortKey as keyof Product];

    if (aValue === undefined || bValue === undefined) return 0;

    if (aValue < bValue) {
      return sortDirection === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const requestSort = (key: keyof Product) => {
    const direction = (sortKey === key && sortDirection === 'ascending') ? 'descending' : 'ascending';
    setSortKey(key);
    setSortDirection(direction);
  };

  const handleDelete = (id: number | undefined) => {
    if (id && window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      dispatch(deleteProduct(id));  
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar producto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('title')}>Producto</th>
            <th onClick={() => requestSort('price')}>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => navigate(`/productedit/${product.id}`)} style={{marginBottom:10}}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <button onClick={() => navigate('/productcreate')} className={styles.createButton}>
        Crear Producto
      </button>
    </div>
  );
};

export default Products;
