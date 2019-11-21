import { GET_PROFILE } from '../actions/types';

const initialState = {
    profiles: []
};

export default function (state = initialState, action) {
    console.log("action in profileReducer", action);
    switch (action.type) {
        case GET_PROFILE:
                console.log("in case GET_PROFILES");
            return {
                ...state,
                profiles: action.payload
            }
        default:
            return state;
    }
}