import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { message } from 'antd';

const baseUrl = import.meta.env.REACT_APP_API_URI || 'http://localhost:8080/api';

const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authLogin');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        message.error('Please log in');
        window.location.href = '/Login';
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    buyTickets: builder.mutation({
      query: ({ userId, flightId }) => ({
        url: '/user/ticketBuy',
        method: 'POST',
        body: { userId,flightId },
      }),
      transformResponse: (response) => {
        message.success('Ticket purchased successfully');
        return response;
      },
      transformErrorResponse: (error) => {
        if (error.status === 403) {
          message.error('Login required to purchase tickets');
        }
        return error;
      },
    }),
    getTickets: builder.mutation({
      query: ({userId}) => ({
        url: `/user/getUserTickets`,
        method: 'POST',
        body: { userId }
      }),
      transformResponse: (response) => {
        message.success('Tickets fetched successfully');
        return response;
      },
      transformErrorResponse: (error) => {
        message.error('Failed to fetch tickets');
        return error;
      },
    }),
  }),
});

export const { useBuyTicketsMutation, useGetTicketsMutation } = ticketsApi;
export default ticketsApi;
