import api from './client';

export const createUser = async (data: {
  uuid: string;
  name: string;
  gender?: 'male' | 'female' | 'other';
}) => {
  const res = await api.post('/users/users', data);
  return res.data;
};

export const getMyProfile = async (token: string) => {
  const res = await api.get('/users/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateMyProfile = async (
  token: string,
  data: {
    name?: string;
    gender?: 'male' | 'female' | 'other';
  }
) => {
  const res = await api.put('/users/users/me', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteMyProfile = async (token: string) => {
  const res = await api.delete('/users/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
