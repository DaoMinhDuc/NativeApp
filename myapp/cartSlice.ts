// cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as any[], // Khởi tạo giỏ hàng là một mảng rỗng
  reducers: {
    addToCart: (state, action) => {
      // Thêm sản phẩm vào giỏ hàng
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // Xóa sản phẩm khỏi giỏ hàng
      state = state.filter(item => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      // Tăng số lượng sản phẩm trong giỏ hàng
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      // Giảm số lượng sản phẩm trong giỏ hàng
      const item = state.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
