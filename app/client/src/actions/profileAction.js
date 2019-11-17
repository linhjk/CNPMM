import axios from 'axios';
import { GET_PROFILE } from './types';

export const getProfile = () => dispatch => {
    console.log("aaaaaaa")
    axios
        .get('http://localhost:5000/auth/users')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};  