import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: string;
  users: User[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: 'user@example.com',
  users: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = '';
    },
    updateUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload); 
    },
  },
});

export const { login, logout, updateUser, createUser } = authSlice.actions;
export default authSlice.reducer;
