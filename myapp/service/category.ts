import { itemUrl } from './api';

const categoryUrl = `${itemUrl}/categories`;

export const getCategoryList = () => {
  return fetch(categoryUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getCategoryItems = (category) => {
  const url = `${categoryUrl}/${category}/items`;

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw error;
    });
};