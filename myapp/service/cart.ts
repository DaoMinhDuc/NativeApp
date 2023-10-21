import axios from 'axios';
import { cartUrl } from './api'; 

// Hàm thêm sản phẩm vào giỏ hàng
export const addToCart = async (foodData) => {
  try {
    const response = await axios.post(cartUrl, foodData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
    throw error;
  }
};

// Hàm lấy danh sách sản phẩm trong giỏ hàng
export const getCartItems = async () => {
  try {
    const response = await axios.get(cartUrl);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm trong giỏ hàng:', error);
    throw error;
  }
};

// Hàm xóa một sản phẩm khỏi giỏ hàng
export const removeFromCart = async (foodId) => {
  try {
    await axios.delete(`${cartUrl}/${foodId}`);
    console.log('Đã xóa sản phẩm khỏi giỏ hàng');
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    throw error;
  }
};

// Hàm xóa toàn bộ giỏ hàng
export const clearCart = async () => {
  try {
    await axios.delete(cartUrl);
    console.log('Đã xóa toàn bộ giỏ hàng');
  } catch (error) {
    console.error('Lỗi khi xóa toàn bộ giỏ hàng:', error);
    throw error;
  }
};
