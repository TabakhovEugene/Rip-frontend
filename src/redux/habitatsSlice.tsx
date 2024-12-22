// src/redux/habitatsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import Cookies from 'js-cookie';
import axios from "axios";

// Асинхронный экшен для загрузки мест обитания
export const fetchHabitats = createAsyncThunk(
    'habitats/fetchHabitats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/habitats/');
            const habitats = response.data.filter(item => item.pk !== undefined);

            // Извлекаем draft_request_id и count из данных
            const animalIdData = response.data.find((item) => item.draft_request_id);
            const animalCountData = response.data.find((item) => item.count);

            return {
                habitats,
                draftRequestId: animalIdData?.draft_request_id || null,
                count: animalCountData?.count || 0,
            };
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

// Асинхронный экшен для поиска мест обитания
export const searchHabitats = createAsyncThunk(
    'habitats/searchHabitats',
    async (inputValue, { rejectWithValue }) => {
        try {
            const response = await api.habitats.habitatsList({ title: inputValue });
            return response.data.filter(item => item.pk !== undefined);
        } catch (error) {
            return rejectWithValue('Ошибка при выполнении поиска');
        }
    }
);

// Асинхронный экшен для добавления места обитания в заявку
export const addHabitatToDraft = createAsyncThunk(
    'habitats/addHabitatToDraft',
    async (habitatId, { getState, rejectWithValue }) => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            const response = await api.habitats.habitatsAddCreate(habitatId, {}, {
                headers: { 'X-CSRFToken': csrfToken }
            });

            return { updatedHabitats: response.data };
        } catch (error) {
            return rejectWithValue('Ошибка при добавлении МО');
        }
    }
);

// Слайс
const habitatsSlice = createSlice({
    name: 'habitats',
    initialState: {
        habitats: [],
        inputValue: '',
        currentAnimalId: null,
        currentCount: 0,
        loading: false,
        error: null,
    },
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Обработка загрузки мест обитания
            .addCase(fetchHabitats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHabitats.fulfilled, (state, action) => {
                state.loading = false;
                state.habitats = action.payload.habitats;
                state.currentAnimalId = action.payload.draftRequestId;
                state.currentCount = action.payload.count;
            })
            .addCase(fetchHabitats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Обработка поиска мест обитания
            .addCase(searchHabitats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchHabitats.fulfilled, (state, action) => {
                state.loading = false;
                state.habitats = action.payload;
            })
            .addCase(searchHabitats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Обработка добавления места обитания в заявку
            .addCase(addHabitatToDraft.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addHabitatToDraft.fulfilled, (state, action) => {
                state.loading = false;
                state.habitats = state.habitats.filter(habitat => habitat.pk !== action.payload.updatedHabitats.pk);
                state.currentAnimalId = action.payload.updatedAnimalId;
                state.currentCount += 1;
            })
            .addCase(addHabitatToDraft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setInputValue } = habitatsSlice.actions;

export default habitatsSlice.reducer;
