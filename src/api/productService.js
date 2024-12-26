import api from './api'

export const addProduct = (product) => api.post('/api/products', product);
