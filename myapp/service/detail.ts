// import axios from 'axios';
// import { itemUrl } from './api'; 

// // Hàm lấy chi tiết sản phẩm dựa trên foodId
// export const getFoodDetail = async (foodId) => {
//   try {
//     const response = await axios.get(`${itemUrl}/${foodId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi lấy chi tiết sản phẩm từ API:', error);
//     throw error;
//   }
// };













import axios from 'axios';

// URL của bạn
const itemUrl = 'https://6511ac49b8c6ce52b394e02a.mockapi.io/test/food';

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






