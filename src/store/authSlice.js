import { createSlice } from '@reduxjs/toolkit';

// Initial state for the auth slice
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

// Export actions for the auth slice
export const { loginSuccess, logout, setLoading, setError } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
