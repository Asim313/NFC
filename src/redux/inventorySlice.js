
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Store the user info, including the role
  items: [
    { id: 1, name: 'Item 1', quantity: 10, location: 'Shelf A1', owner: 'User A' },
    { id: 2, name: 'Item 2', quantity: 5, location: 'Shelf B2', owner: 'User B' },
  ],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    login: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { addItem, updateItem, deleteItem, login } = inventorySlice.actions;
export default inventorySlice.reducer;
