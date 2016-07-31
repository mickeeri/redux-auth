import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export const authError = (error) => (
  { type: AUTH_ERROR, payload: error }
);

export const signinUser = ({ email, password }) => (dispatch) => {
  axios.post(`${ROOT_URL}/signin`, { email, password }).then(
    response => {
      // Update state to indicate user is authenticated.
      dispatch({ type: AUTH_USER });
      // Save JWT token.
      localStorage.setItem('token', response.data.token);
      // Redirect to route '/feature'.
      browserHistory.push('/feature');
    },
  ).catch(
    () => {
      dispatch(authError('Wrong credentials'));
    }
  );
};

export const signupUser = ({ email, password }) => (dispatch) => {
  axios.post(`${ROOT_URL}/signup`, { email, password }).then(
    response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    }
  ).catch(error => {
    const errorMessage = error.response ? error.response.data.error : error.message;
    dispatch(authError(errorMessage));
  });
};

export const signoutUser = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
};

export const fetchMessage = () => (dispatch) => {
  axios.get(ROOT_URL, {
    headers: { authorization: localStorage.getItem('token') },
  }).then(
    response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message,
      });
    }
  );
};

