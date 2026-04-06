import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PhotosApi = createApi({
    reducerPath: 'PhotosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Photos'],
    endpoints: (builder) => ({
        getPhotos: builder.query({
            query: () => 'photos',
            providesTags: ['Photos']
        }),
        getPhotoById: builder.query({
            query: (id) => `photos/${id}`,
            providesTags: ['Photos']
        }),
        getPhotosByAlbumId: builder.query({
            query: (albumId) => `photos?albumId=${albumId}`,
            providesTags: ['Photos']
        }),
        createPhoto: builder.mutation({
            query: (newPhoto) => ({
                url: 'photos',
                method: 'POST',
                body: newPhoto
            }),
            invalidatesTags: ['Photos']
        }),
        updatePhoto: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `photos/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Photos']
        }),
        deletePhoto: builder.mutation({
            query: (id) => ({
                url: `photos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Photos']
        })
    })
})

export const { useGetPhotosQuery, useGetPhotoByIdQuery, useGetPhotosByAlbumIdQuery, useCreatePhotoMutation, useUpdatePhotoMutation, useDeletePhotoMutation } = PhotosApi