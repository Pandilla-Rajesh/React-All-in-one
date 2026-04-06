import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PostsApi = createApi({
    reducerPath: 'PostsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => 'posts',
            providesTags: ['Posts']
        }),
        getPostById: builder.query({
            query: (id) => `posts/${id}`,
            providesTags: ['Posts']
        }),
        getPostsByUserId: builder.query({
            query: (userId) => `posts?userId=${userId}`,
            providesTags: ['Posts']
        }),
        createPost: builder.mutation({
            query: (newPost) => ({
                url: 'posts',
                method: 'POST',
                body: newPost
            }),
            invalidatesTags: ['Posts']
        }),
        updatePost: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Posts']
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Posts']
        })
    })
})

export const { useGetPostsQuery, useGetPostByIdQuery, useGetPostsByUserIdQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = PostsApi



