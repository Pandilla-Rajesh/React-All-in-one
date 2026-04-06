import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CommentsApi = createApi({
    reducerPath: 'CommentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({
        getComments: builder.query({
            query: () => 'comments',
            providesTags: ['Comments']
        }),
        getCommentById: builder.query({
            query: (id) => `comments/${id}`,
            providesTags: ['Comments']
        }),
        getCommentsByPostId: builder.query({
            query: (postId) => `posts/${postId}/comments`,
            providesTags: ['Comments']
        }),
        createComment: builder.mutation({
            query: (newComment) => ({
                url: 'comments',
                method: 'POST',
                body: newComment
            }),
            invalidatesTags: ['Comments']
        }),
        updateComment: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `comments/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Comments']
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `comments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comments']
        })
    })
})

export const { useGetCommentsQuery, useGetCommentByIdQuery, useGetCommentsByPostIdQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } = CommentsApi