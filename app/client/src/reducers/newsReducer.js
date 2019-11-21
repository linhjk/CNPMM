import { GET_NEWS } from '../actions/types';

const initialState = {
    newsitems: []
};

export default function (state = initialState, action) {
    console.log("action in newReducer", action);
    switch (action.type) {
        case GET_NEWS:
                console.log("in case GET_NEWS");
            return {
                ...state,
                newsitems: action.payload
            }
        default:
            return state;
    }
}