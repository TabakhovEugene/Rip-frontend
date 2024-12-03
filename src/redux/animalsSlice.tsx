import { createSlice } from '@reduxjs/toolkit';

// Типы состояния
interface AnimalsState {
    habitats_amount: number;
    pk: number | null;
}

const initialState: AnimalsState = {
    habitats_amount: 0,
    pk: null
};

const animalsSlice = createSlice({
    name: 'animals',
    initialState,
    reducers: {
        setHabitatsAmount: (state, action) => {
            state.habitats_amount = action.payload;
        },
        setAnimalPk: (state, action) => {
            state.pk = action.payload;
        }
    },
});

export const { setHabitatsAmount, setAnimalPk } = animalsSlice.actions;

export default animalsSlice.reducer;