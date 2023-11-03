import axios from 'axios';
import { itemUrl } from './api';

const categoryUrl = `${itemUrl}/all/category`;

export const getCategoryList = () => {
  return axios
    .get(categoryUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching category list:', error);
      throw error;
    });
};

export const getCategoryItems = (category) => {
  const url = `${categoryUrl}/${category}/item`;

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching items for category:', error);
      throw error;
    });
  };

// const itemUrl = 'https://6511ac49b8c6ce52b394e02a.mockapi.io/test/food';