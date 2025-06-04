import api from './client';

export const createPayment = async (paymentData: {
  order_id: string;
  amount: number;
}) => {
  const res = await api.post('/payments/payments', paymentData);
  return res.data; // contains { payment_id, snap_token, redirect_url }
};

export const sendPaymentCallback = async (callbackData: any) => {
  const res = await api.post('/payments/payments/callback', callbackData);
  return res.data;
};

export const sendPaymentWebhook = async (webhookData: any) => {
  const res = await api.post('/payments/payments/webhook', webhookData);
  return res.data;
};
