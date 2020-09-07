import AuthActionTypes from "../types/auth.types";
import { UserI } from "../../types/interfaces";

export interface State {
  token: string | null;
  isAuthenticated: boolean | null;
  user: UserI | null;
}

const initialState = {
  token: null,
  isAuthenticated: null,
  user: null,
};

const authReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case AuthActionTypes.LOG_OUT:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
