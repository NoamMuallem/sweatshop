import AuthActionTypes from "../types/auth.types";
import axios from "axios";
import { setLoading, stopLoading } from "./ui.actions";

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// Login User
export const login = (email: string, password: string) => (
  dispatch: Function
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ email, password });
  //user loading
  dispatch(setLoading());
  axios
    .post("api/user/users/login", body, config)
    .then((res) => {
      dispatch({
        type: AuthActionTypes.LOG_IN,
        payload: res.data,
      });
      dispatch(stopLoading());
    })
    .catch((err) => {
      console.log(err);
      //   dispatch(
      //     returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      //   );
      dispatch(stopLoading());
    });
};

// Logout User
export const logout = () => (dispatch: Function) => {
  dispatch({ type: AuthActionTypes.LOG_OUT });
};

// User Update
export const update = (password?: string, currentPassword?: string) => (
  dispatch: Function,
  getState: Function
) => {
  // loading
  dispatch(setLoading());

  //construct data object for req
  let data = {
    ...(password ? { password } : {}),
    ...(currentPassword ? { currentPassword } : {}),
  };

  axios
    .patch("/api/auth/user", data, tokenConfig(getState))
    .then(() => {
      dispatch(stopLoading());
      //  dispatch(clearErrors());
    })
    .catch((error) => {
      console.log(error);
      dispatch(stopLoading());
      // //for handleing password change errors
      //   if (password) {
      //     dispatch(
      //       returnErrors(
      //         error.response.data,
      //         error.status,
      //         E_ERROR.CHANGE_PASSWORD_FAIL
      //       )
      //     );
      // });
    });
};

// Setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config: IConfigHeaders = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
