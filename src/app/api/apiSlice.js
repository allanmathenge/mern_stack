import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://allan-api-mlkp.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {

        // Send Refresh Token to get new Access Token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions) 

        if (refreshResult?.data) {
            
            // Store the new token
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // Retry Original Query with new access Token
            result = await baseQuery(args, api, extraOptions)
        } else {
            
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.message = ("Your Login has Expired!")
            }
            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})