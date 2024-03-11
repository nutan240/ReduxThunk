import { combineReducers } from 'redux';
import dataSlice from './slice/dataSlice';

const rootReducer = combineReducers({
    dataSlice :dataSlice,
});

export default rootReducer ;