import api from './api'

export const login = (payload) => api.post('/api/users/login', payload);
export const register = (user) => api.post('/api/users', user);
export const findUserById = (userId) => api.get(`/api/users/${userId}`);