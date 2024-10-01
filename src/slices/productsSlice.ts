import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

// Obtener productos
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return (await response.json()) as Product[];
});

// Actualizar producto
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: Product) => {
    const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return await response.json();
  }
);

// Eliminar producto
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
      };
      state.products.push(newProduct);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; 
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload); 
      });
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
