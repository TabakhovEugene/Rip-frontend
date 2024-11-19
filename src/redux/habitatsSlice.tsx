// src/redux/threatsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputValue: '',
    habitats: [],
    currentAnimalId: null,
    currentCount: 0,
};

const habitatsSlice = createSlice({
    name: 'habitats',
    initialState,
    reducers: {
        setHabitats: (state, action) => {
            state.habitats = action.payload;
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setCurrentAnimalId: (state, action) => {
            state.currentAnimalId = action.payload;
        },
        setCurrentCount: (state, action) => {
            state.currentCount = action.payload;
        },
    },
});

export const {
    setHabitats,
    setInputValue,
    setCurrentAnimalId,
    setCurrentCount,
} = habitatsSlice.actions;

export default habitatsSlice.reducer;