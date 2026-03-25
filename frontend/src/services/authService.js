import api from '../api/axios';

export const loginCall = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const signupCall = async (username, email, password) => {
  const res = await api.post('/auth/signup', { username, email, password });
  return res.data;
};
