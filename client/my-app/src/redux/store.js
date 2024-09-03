import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/Userslice';

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})