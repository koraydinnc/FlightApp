import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { message } from 'antd'; 
const baseUrl = import.meta.env.REACT_APP_API_URI || 'http://localhost:8080/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: '/user/login',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response) => {
        const token = response.token; 
        if (token) {
          localStorage.setItem('authLogin', token);
          message.success('Login Successful');
          return token;
        }
        throw new Error('Login failed');
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
