import { createApi } from "@reduxjs/toolkit/query";


const baseUrl = import.meta.env.REACT_APP_API_URI || 'http://localhost:8080/api';


const ticketsApi = createApi({
    reducerPath:'ticketsApi',
    baseQuery:({baseUrl}),
    endpoints: (builder) => ({
        buyTickets: builder.mutation({
            query: ({userId, flightId}) => ({
                 baseUrl:'/user/ticketBuy',
                 method:'POST',
                 headers: {
                    autheriz
                 }
            })
              
        })
    })

})

