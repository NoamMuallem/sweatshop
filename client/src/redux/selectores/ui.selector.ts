import { createSelector } from "reselect";
import { uiReducerState } from "../reducers/ui.reducer";

export const ui = (state: any) => state.ui;

export const selectLoading = createSelector(
  [ui],
  (state: uiReducerState) => state.loading
);
