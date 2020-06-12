import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    actor: null,
};

const actorSlice = createSlice({
    name: 'actor',
    initialState,
    reducers: {
        setActor(state, action) {
            state.actor = action.payload;
        },
    },
});

export const {
    setActor,
} = actorSlice.actions;

export default actorSlice.reducer;
