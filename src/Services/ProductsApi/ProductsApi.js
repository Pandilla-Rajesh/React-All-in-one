import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ProductsApi = createApi({
    reducerPath: 'ProductsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products',
            providesTags: ['Products']
        }),
        getProductById: builder.query({
            query: (id) => `products/${id}`,
            providesTags: ['Products']
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products/category/${category}`,
            providesTags: ['Products']
        }),
        getAllCategories: builder.query({
            query: () => 'products/categories',
            providesTags: ['Products']
        }),
        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: 'products',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Products']
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery, useGetAllCategoriesQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = ProductsApi