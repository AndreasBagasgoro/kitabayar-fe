import api from './client';

export const getOrders = async () => {
  const res = await api.get('/orders');
  return res.data;
};

export const getOrderById = async (uuid: string) => {
  const res = await api.get(`/orders/${uuid}`);
  return res.data;
};

export const createOrder = async (orderData: {
  user_uuid: string;
  restaurant_id: number;
  total_amount: number;
  delivery_address: object;
  items: {
    menu_item_id: number;
    menu_item_snapshot: object;
    quantity: number;
    total_price: number;
  }[];
}) => {
  const res = await api.post('/orders', orderData);
  return res.data;
};

export const updatePaymentStatus = async (
  uuid: string,
  status: 'pending' | 'paid' | 'failed'
) => {
  const res = await api.patch(`/orders/${uuid}/payment-status`, {
    payment_status: status,
  });
  return res.data;
};
