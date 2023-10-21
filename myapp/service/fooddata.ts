// api.ts
import axios from 'axios';

export const fetchFoodData = (category: string) => {
  let apiUrl = '';

  if (category === 'Food') {
    // apiUrl = 'https://api.example.com/food';
    apiUrl = 'https://6511ac49b8c6ce52b394e02a.mockapi.io/test/food';
  } else if (category === 'Drink') {
    apiUrl = 'https://api.example.com/drinks';
  } else if (category === 'Snack') {
    apiUrl = 'https://api.example.com/snacks';
  } else if (category === 'Sauce') {
    apiUrl = 'https://api.example.com/sauce';
  }

  return axios.get(apiUrl);
};
