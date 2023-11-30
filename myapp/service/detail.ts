import axios from 'axios';
import { detailUrl } from './api'; 


export const getDetailItem = (itemId) => {
  return axios.get(`${detailUrl}/${itemId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
