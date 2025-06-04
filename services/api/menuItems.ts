import api from './client';

export const getMenuItemsByRestaurant = async (restaurantId: string) => {
  const res = await api.get(`/restaurants/restaurants/${restaurantId}/menu-items`);
  console.log('API result:', res.data);
  return res.data;
};

export const createMenuItem = async (
  restaurantId: string,
  item: {
    name: string;
    price: number;
    description: string;
    image_url?: string;
  }
) => {
  const res = await api.post(`/restaurants/restaurants/${restaurantId}/menu-items`, item);
  return res.data;
};

export const getMenuItemById = async (uuid: string) => {
  const res = await api.get(`/restaurants/menu-items/${uuid}`);
  return res.data;
};
