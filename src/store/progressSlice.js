import { createSlice } from '@reduxjs/toolkit';

// Initial state for the progress slice
const initialState = {
    courseId: null,
    lessonId: null,
};

// Create the progress slice
const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        setProgress: (state, action) => {
            state.courseId = action.payload.courseId;
            state.lessonId = action.payload.lessonId;
        },
    },
});

// Export actions for the progress slice
export const { setProgress } = progressSlice.actions;

// Export the reducer to be used in the store
export default progressSlice.reducer;
