import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shows: [],
    show: null,
};

const showSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        setShows(state, action) {
            state.shows = action.payload;
        },
        setCurrentShow(state, action) {
            state.show = action.payload;
        },
    },
});

export const {
    setShows,
    setCurrentShow,
} = showSlice.actions;

export default showSlice.reducer;
