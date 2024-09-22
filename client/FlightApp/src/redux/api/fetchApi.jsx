import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.REACT_APP_API_URI || 'http://localhost:8080/api'; 


const fetchApi = createApi({
    reducerPath:'fetchFlightApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        fetchFlightsToday: builder.mutation({
            query:() => ({
                url:'/user/fetchFlightsToday',
                method:'POST'
            })
        })
    })

})

export const {useFetchFlisghtsTodayMutation} = fetchApi;

export default fetchApi;