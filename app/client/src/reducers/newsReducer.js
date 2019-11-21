import { GET_NEWS, GET_NEWSBYCATEGORY, GET_NEWBYID } from '../actions/types';


const initialState = {
    newsitems: [],
    itemsbycategory: [],
    newbyid:[],
};

export default function (state = initialState, action) {
    console.log("action in newReducer", action);
    switch (action.type) {
        case GET_NEWS:
                console.log("in case GET_NEWS");
            return {
                ...state,
                newsitems: action.payload
            };
        case GET_NEWSBYCATEGORY:
            console.log("zzzzz");
            return {
                ...state,
                itemsbycategory: action.payload
            };
        case GET_NEWBYID:
            return{
                ...state,
                newbyid: action.payload
            }
        default:
            return state;
    }
}