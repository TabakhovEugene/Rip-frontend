import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Типы состояния
interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    is_staff: boolean;
}

const initialState: AuthState = {
    isAuthenticated: !!(sessionStorage.getItem('username') && Cookies.get('sessionid')),
    username: sessionStorage.getItem('username') || null,
    is_staff: !!sessionStorage.getItem('is_staff'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; is_staff: boolean }>) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.is_staff = action.payload.is_staff;

            sessionStorage.setItem('username', action.payload.username);
            sessionStorage.setItem('is_staff', action.payload.is_staff);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.is_staff = false;

            // Удаляем username из localStorage при выходе
            sessionStorage.removeItem('username');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;