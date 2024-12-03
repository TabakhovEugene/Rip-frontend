import { configureStore } from '@reduxjs/toolkit';
import habitatsReducer from './habitatsSlice';
import animalsReducer from './animalsSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        habitats: habitatsReducer,
        animals: animalsReducer,
        auth: authReducer,
    },
});

export default store;