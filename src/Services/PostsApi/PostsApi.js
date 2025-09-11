import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PostsApi = createApi({
    reducerPath:'PostsApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://jsonplaceholder.typicode.com/'}),
    endpoints:(builder)=>({
        getPosts: builder.query({
            query:()=>'posts',
        })
    })
})
export const {useGetPostsQuery} = PostsApi


