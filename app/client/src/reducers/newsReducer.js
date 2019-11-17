import { GET_NEWS } from '../actions/types';

const initialState = {
    newsitems: []
};

export default function (state = initialState, action) {
    console.log("ajksfhkj", action);
    switch (action.type) {
        case GET_NEWS:
                console.log("bbb");
            return {
                ...state,
                newsitems: action.payload
            }
        default:
            return state;
    }
}