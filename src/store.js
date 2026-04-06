import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { PostsApi } from './Services/PostsApi/PostsApi'
import { UsersApi } from './Services/UsersApi/UsersApi'
import { ProductsApi } from './Services/ProductsApi/ProductsApi'
import { CommentsApi } from './Services/CommentsApi/CommentsApi'
import { TodosApi } from './Services/TodosApi/TodosApi'
import { PhotosApi } from './Services/PhotosApi/PhotosApi'
// import Counter from './Components/ReducerUse/ReducerUse'
import CounterReducer from './Components/ReducerUse/CounterReducer'

const rootReducer = combineReducers({
    Counter: CounterReducer,
    [PostsApi.reducerPath]: PostsApi.reducer,
    [UsersApi.reducerPath]: UsersApi.reducer,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [CommentsApi.reducerPath]: CommentsApi.reducer,
    [TodosApi.reducerPath]: TodosApi.reducer,
    [PhotosApi.reducerPath]: PhotosApi.reducer
})


export const store = configureStore({
    reducer: rootReducer,
    CounterReducer,
    middleware: (getDefaultMiddilware) =>
        getDefaultMiddilware()
        .concat(PostsApi.middleware)
        .concat(UsersApi.middleware)
        .concat(ProductsApi.middleware)
        .concat(CommentsApi.middleware)
        .concat(TodosApi.middleware)
        .concat(PhotosApi.middleware)
})


export default store