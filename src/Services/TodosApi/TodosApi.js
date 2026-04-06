import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TodosApi = createApi({
    reducerPath: 'TodosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => 'todos',
            providesTags: ['Todos']
        }),
        getTodoById: builder.query({
            query: (id) => `todos/${id}`,
            providesTags: ['Todos']
        }),
        getTodosByUserId: builder.query({
            query: (userId) => `todos?userId=${userId}`,
            providesTags: ['Todos']
        }),
        getTodosByStatus: builder.query({
            query: (completed) => `todos?completed=${completed}`,
            providesTags: ['Todos']
        }),
        createTodo: builder.mutation({
            query: (newTodo) => ({
                url: 'todos',
                method: 'POST',
                body: newTodo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `todos/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos']
        })
    })
})

export const { useGetTodosQuery, useGetTodoByIdQuery, useGetTodosByUserIdQuery, useGetTodosByStatusQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = TodosApi