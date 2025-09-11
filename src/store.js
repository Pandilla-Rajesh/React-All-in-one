import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { PostsApi } from './Services/PostsApi/PostsApi'

export const store = configureStore({
  reducer: {
    [PostsApi.reducerPath]: PostsApi.reducer
  }, 
  middleware: (getDefaultMiddilware)=>
    getDefaultMiddilware().concat(PostsApi.middleware)
})

export default store