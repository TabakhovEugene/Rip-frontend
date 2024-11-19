import { configureStore } from '@reduxjs/toolkit';
import habitatsReducer from './habitatsSlice';

const store = configureStore({
    reducer: {
        habitats: habitatsReducer,
    },
});

export default store;