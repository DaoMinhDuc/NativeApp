
const API_URL = 'https://6511ac49b8c6ce52b394e02a.mockapi.io/test/food';

export const fetchItems = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
