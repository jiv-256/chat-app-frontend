// import axios from 'axios';

// // export const baseUrl = 'chatappbackend-production-da64.up.railway.app';
// export const baseUrl = process.env.REACT_APP_API_URL;

// export const httpClient = axios.create({
//     baseURL: baseUrl, 
// });

import axios from 'axios';

export const baseUrl = import.meta.env.VITE_API_URL;  // Vite way

export const httpClient = axios.create({
  baseURL: baseUrl,
});