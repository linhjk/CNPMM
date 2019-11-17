import { GET_PROFILE } from '../actions/types';

const initialState = {
    profiles: []
};

export default function (state = initialState, action) {
    console.log("kkkkkkkk", action);
    switch (action.type) {
        case GET_PROFILE:
                console.log("aaaa");
            return {
                ...state,
                profiles: action.payload
            }
        default:
            return state;
    }
}