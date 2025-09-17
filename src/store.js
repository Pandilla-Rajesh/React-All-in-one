import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import React from 'react'
import { PostsApi } from './Services/PostsApi/PostsApi'
import Counter from './Components/ReducerUse/ReducerUse'
import CounterReducer from './Components/ReducerUse/CounterReducer'

const rootReducer = combineReducers({
  Counter: CounterReducer,
  [PostsApi.reducerPath]: PostsApi.reducer
})


export const store = configureStore({
  reducer:rootReducer, CounterReducer,
  middleware: (getDefaultMiddilware)=>
    getDefaultMiddilware().concat(PostsApi.middleware)
})


export default store