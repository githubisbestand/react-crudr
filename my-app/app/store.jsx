import { configureStore } from '@reduxjs/toolkit';
import  userDetail  from '../features/userDatailsSlice';

export const store = configureStore({
    reducer : {
        app : userDetail
    },
});