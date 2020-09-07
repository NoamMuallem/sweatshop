import { createSelector } from "reselect";
import { TamplateReducerState } from "../reducers/tamplate.reducer";

export const tamplates = (state: any) => state.tamplates;

export const selectTamplates = createSelector(
  [tamplates],
  (state: TamplateReducerState) => ({ ...state.tamplates })
);
