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

//TODO:convert here toString() the buffer from server
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
      let result: { [key: string]: TamplateI } = {};
      for (let i = 0; i < temp.length; i++) {
        result[temp[i]._id!] = temp[i];
      }
      return {
        ...state,
        tamplates: result,
      };

    case tamplatesActionTypes.ADD_NEW_TAMPLATE:
      let tamplateCoppy = state.tamplates;
      tamplateCoppy[action.payload._id!] = action.payload;
      return {
        ...state,
        tamplates: tamplateCoppy,
      };

    case tamplatesActionTypes.UPDATE_TAMPLATE:
      let tamplate = state.tamplates[action.payload._id!];
      let coppyTamplates = state.tamplates;
      coppyTamplates[tamplate._id!] = action.payload;
      return {
        ...state,
        tamplates: coppyTamplates,
      };

    case tamplatesActionTypes.DELETE_TAMPLATE:
      let tamplateCoppyDelete = state.tamplates;
      delete tamplateCoppyDelete[action.payload];
      return {
        ...state,
        tamplates: tamplateCoppyDelete,
      };

    default:
      return state;
  }
};
