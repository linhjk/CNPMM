import axios from 'axios';
import { GET_NEWS } from './types';

export const getNews = () => dispatch => {
    console.log("bbbbbbbbb")
    axios
        .get('http://localhost:5000/news')
        .then(res =>
            dispatch({
                type: GET_NEWS,
                payload: res.data
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_NEWS,
                payload: {}
            })
        );
};  