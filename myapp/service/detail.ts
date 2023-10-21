import axios from 'axios';
import { itemUrl } from './api'; 

// Hàm lấy chi tiết sản phẩm dựa trên foodId
export const getFoodDetail = async (foodId) => {
  try {
    const response = await axios.get(`${itemUrl}/${foodId}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm từ API:', error);
    throw error;
  }
};
