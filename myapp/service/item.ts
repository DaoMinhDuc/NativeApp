import axios from 'axios';
import { itemUrl } from './api';

export const getAllItemApi = async () => {
  try {
    const response = await axios.get(itemUrl + '/all');
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};