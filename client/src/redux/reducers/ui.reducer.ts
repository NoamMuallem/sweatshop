import uiTypes from "../types/ui.types";

export interface uiReducerState {
  loading: boolean;
}

const INITIAL_STATE = {
  loading: false,
};

export const uiReducer = (
  state: uiReducerState = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case uiTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case uiTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
