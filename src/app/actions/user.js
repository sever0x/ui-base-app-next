import axios from 'misc/requests';
import config from 'config';
import Cookies from 'js-cookie';
import {
  ERROR_SIGN_UP,
  RECEIVE_USER,
  REQUEST_GOOGLE_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_SIGN_UP,
  REQUEST_USER,
  SUCCESS_SIGN_UP,
} from '../constants/actionTypes';

const receiveUser = (user) => ({
  payload: user,
  type: RECEIVE_USER,
});

const requestUser = () => ({
  type: REQUEST_USER,
});

const errorSignUp = (errors) => ({
  payload: errors,
  type: ERROR_SIGN_UP,
});

const requestSignUp = () => ({
  type: REQUEST_SIGN_UP,
});

const successSignUp = () => ({
  type: SUCCESS_SIGN_UP,
});

const requestSignOut = () => ({
  type: REQUEST_SIGN_OUT,
});

const requestGoogleSignIn = () => ({
  type: REQUEST_GOOGLE_SIGN_IN,
});

const getUser = () => {
  const { BACKEND_SERVICE } = config;
  return axios.get(`${BACKEND_SERVICE}/api/profile`, {
    withCredentials: true,
  });
};

const signIn = () => {
  const {
    BACKEND_SERVICE,
  } = config;
  window.location.href = `${BACKEND_SERVICE}/oauth/authenticate`
};

const signUp = ({
  email,
  firstName,
  lastName,
  login,
  password,
}) => {
  const {
    USERS_SERVICE,
  } = config;
  return axios.post(
    `${USERS_SERVICE}/user/signUp`,
    {
      email,
      firstName,
      lastName,
      login,
      password,
    },
  );
};

const fetchRefreshToken = () => (dispatch) => {

};

const fetchSignOut = () => (dispatch) => {
  Cookies.remove('SESSION-ID', { path: '/' });
  dispatch(requestSignOut());
};

const fetchSignUp = ({
  email,
  firstName,
  lastName,
  login,
  password,
}) => (dispatch) => {
  dispatch(requestSignUp());
  return signUp({
    email,
    firstName,
    lastName,
    login,
    password,
  }).then(() => dispatch(successSignUp()))
    .catch((errors) => dispatch(errorSignUp(errors)))
};

const fetchGoogleSignIn = () => (dispatch) => {
  dispatch(requestGoogleSignIn());
  return signIn();
};

const fetchUser = () => (dispatch) => {
  dispatch(requestUser());
  return getUser()
    .then(user => dispatch(receiveUser(user)))
    .catch(() => dispatch(fetchSignOut()));
};

const exportFunctions = {
  fetchRefreshToken,
  fetchSignOut,
  fetchSignUp,
  fetchUser,
  fetchGoogleSignIn,
};

export default exportFunctions;
