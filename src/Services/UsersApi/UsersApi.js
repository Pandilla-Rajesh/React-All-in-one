import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UsersApi = createApi({
    reducerPath: 'UsersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            providesTags: ['Users']
        }),
        getUserById: builder.query({
            query: (id) => `users/${id}`,
            providesTags: ['Users']
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users']
        }),
        updateUser: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = UsersApi