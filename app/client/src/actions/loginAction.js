import axios from 'axios';
import { LOGIN_AUTHENTICATION } from './types';

export const login_Authentication = () => dispatch => {
    console.log("in login_Authentication")
    axios
        .post('http://localhost:5000/auth/authenticate',
            JSON.stringify(
                {
                    name: 'phuc12345',
                    username: 'phuc1235',
                    password: '123456'
                }
            )
        )
        .then(res =>
            dispatch({
                type: LOGIN_AUTHENTICATION,
                payload: res.data
            }),
        )
        .catch(err =>
            dispatch({
                type: LOGIN_AUTHENTICATION,
                payload: {}
            })
        );
};  