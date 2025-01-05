import api from './api'

export const createCart = (cart) => api.post('/api/carrinhos', cart);
export const findCartById = (id) => api.get(`/api/carrinhos/${id}`);
export const updateCart = (id, cartData) => api.put(`/api/carrinhos/${id}`, cartData);