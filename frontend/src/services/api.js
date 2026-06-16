import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/v1';

const api = axios.create({
  baseURL: API_URL,
});

// Adicionar token aos headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (email, name, password, cpf) =>
    api.post('/auth/register', { email, name, password, cpf }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const productService = {
  listProducts: (params) =>
    api.get('/products', { params }),
  
  getProduct: (id) =>
    api.get(`/products/${id}`),
  
  createProduct: (productData) =>
    api.post('/products', productData),
};

export default api;
