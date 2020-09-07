import uiTypes from "../types/ui.types";

export const setLoading = () => ({
  type: uiTypes.START_LOADING,
});

export const stopLoading = () => ({
  type: uiTypes.STOP_LOADING,
});
