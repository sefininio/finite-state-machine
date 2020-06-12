import { combineReducers } from '@reduxjs/toolkit';
import showReducer from './showSlice';
import actorReducer from './actorSlice';

const rootReducer = combineReducers({
    show: showReducer,
    actor: actorReducer,
});

export default rootReducer;
