import axios from 'axios';

const apiUrl = 'https://food-app-api-2-e9fb9958f111.herokuapp.com/api/v1/item/all';

export const getItemsByCategory = (category) => {
  return axios.get(apiUrl)
    .then((response) => {
      const items = response.data;

      if (category) {
        return items.filter((item) => item.category === category);
      }

      return items;
    })
    .catch((error) => {
      console.error('Lỗi khi tải dữ liệu từ API: ', error);
      throw error;
    });
};