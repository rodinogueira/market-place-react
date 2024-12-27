import api from './api'

const addProduct = (product) => api.post('/api/products', product);
const edit = (id, newProduct) => api.put(`/api/products/${id}`, newProduct);
const findAll = () => api.get('/api/products');
const findById = (id) => api.get(`/api/products/${id}`);
const del = (id) => api.delete(`/api/products/${id}`);

export {
    addProduct,
    findAll,
    edit,
    findById,
    del
}