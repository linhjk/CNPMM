import profileReducer from './profileReducer';
import { combineReducers } from 'redux';
import newsReducer from './newsReducer';

export default combineReducers({
    profileReducer,
    newsReducer
});