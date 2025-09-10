// import { configureStore, reducer } from "@reduxjs/toolkit";
// import rootReducer from './reducer'

// const store = configureStore({
//     reducer = rootReducer
// })

// export default store


import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer
});

export default store;
