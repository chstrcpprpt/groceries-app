import axios from "axios";

import { returnErrors } from "./errorActions";

//check token and load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: "USER_LOADING" });


  axios.get("/api/auth/user", tokenConfig(getState))
    .then(res => dispatch({
      type: "USER_LOADED",
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: "AUTH_ERROR"
      });
    });


}

export const tokenConfig = getState => {
  //get token from localstorage
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  //if token, add to headers
  if(token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
}