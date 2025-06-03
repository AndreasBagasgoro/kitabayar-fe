import api from './client';

export const getRestaurants = async () => {
  const res = await api.get('/restaurants/restaurants');
  return res.data;
};

export const getRestaurantById = async (uuid: string) => {
  const res = await api.get(`/restaurants/restaurants/${uuid}`);
  return res.data;
};

export const createRestaurant = async (data: {
  name: string;
  phone: string;
  address: string;
}) => {
  const res = await api.post('/restaurants/restaurants', data);
  return res.data;
};
