import axios from 'axios';
import { orderUrl } from './api';

export const fetchOrderData = () => {
  return axios.get(orderUrl + 'all')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching order data:', error);
    });
};
export const getDetailHistory = (orderId) => {
  return axios.get(`${orderUrl}detail/${orderId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const confirmOrder = (orderId) => {
  // Thực hiện POST để xác nhận đơn hàng
  return axios.post(`${orderUrl}confirm?orderId=${orderId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};