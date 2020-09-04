import { TamplateI } from "../../types/interfaces";
import tamplatesActionTypes from "../types/tamplates.types";

export interface TamplateReducerState {
  tamplates: { [key: string]: TamplateI };
}

interface Action {
  type: string;
  payload?: any;
}

const INITIAL_STATE = {
  tamplates: {},
};

export const TamplatesReducer = (
  state: TamplateReducerState = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case tamplatesActionTypes.SET_TAMPLATES:
      let temp = Array(action.payload).reduce(
        (accumulator: { [key: string]: TamplateI }, element: TamplateI) => {
          return (accumulator[element._id!] = element);
        },
        {}
      );
      return {
        ...state,
        tamplates: temp,
      };

    default:
      return state;
  }
};
