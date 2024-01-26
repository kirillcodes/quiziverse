import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const interceptorQuery = fetchBaseQuery({
  baseUrl: `http://${import.meta.env.VITE_SERVER_URL}/api/`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
})