import axios from 'axios';
import { cartUrl } from './api'; 
import { orderUrl } from './api';

// Hàm thêm sản phẩm vào giỏ hàng
export const addToCart = async ({ itemId }) => {
  try {
    const response = await axios.post(`${cartUrl}/add-item?itemId=${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
    throw error;
  }
};
// Hàm lấy danh sách sản phẩm trong giỏ hàng
export const getCartItems = async () => {
  try {
    const response = await axios.get(`${cartUrl}/get-cart`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm trong giỏ hàng:', error);
    throw error;
  }
};

// Hàm xóa một sản phẩm khỏi giỏ hàng
export const removeFromCart = async (itemId) => {
  try {
    await axios.delete(`${cartUrl}/remove-item?itemId=${itemId}`);
    console.log('Đã xóa sản phẩm khỏi giỏ hàng');
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    throw error;
  }
};
// Hàm đặt hàng
export const placeOrder = async (orderDetails) => {
  try {
    const response = await axios.post(`${orderUrl}place-order`, orderDetails);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi đặt hàng:', error);
    throw error;
  }
};
// const cartUrl = 'https://6528e224931d71583df28880.mockapi.io/Cart';
