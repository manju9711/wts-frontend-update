// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = (url, config = {}) => apiClient.get(url, config);
export const post = (url, data, config = {}) => apiClient.post(url, data, config);
export const put = (url, data, config = {}) => apiClient.put(url, data, config);
export const del = (url, config = {}) => apiClient.delete(url, config);

export default apiClient;