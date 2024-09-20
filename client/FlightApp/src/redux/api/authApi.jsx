import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
