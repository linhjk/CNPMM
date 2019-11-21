import axios from 'axios';
import { GET_NEWS,GET_NEWSBYCATEGORY,GET_NEWBYID } from './types';

export const getNews = () => dispatch => {
    console.log("in action getNews")
    axios
        .get('http://localhost:5000/news')
        .then(res =>
            dispatch({
                type: GET_NEWS,
                payload: res.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_NEWS,
                payload: {}
            })
        );
};

export const getNewsByCategory = (categoryname) => dispatch => {
    console.log("bbbbbbbbb");
    axios.post('http://localhost:5000/findnew', categoryname)
        .then(
            res =>
                dispatch({
                    type: GET_NEWSBYCATEGORY,
                    payload: res.data
                }),
        )
        .catch(
            err =>
                dispatch({
                    type: GET_NEWSBYCATEGORY,
                    payload: {}
                }));
};

export const getNewByID = id => dispatch => {
    axios
      .get(`http://localhost:5000/${id}`)
      .then(res =>
        dispatch({
          type: GET_NEWBYID,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_NEWBYID,
          payload: null
        })
      );
  };