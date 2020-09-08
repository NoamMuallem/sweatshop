import tamplateACtionTypes from "../types/tamplates.types";
import axios from "axios";
import { TamplateI } from "../../types/interfaces";
import { setLoading, stopLoading } from "../actions/ui.actions";
import { tokenConfig } from "../actions/auth.actions";

export const getTamplates = () => (dispatch: Function) => {
  dispatch(setLoading());
  axios
    .get("api/inventory/tamplats")
    .then((res) => {
      dispatch({
        type: tamplateACtionTypes.SET_TAMPLATES,
        payload: res.data,
      });
      dispatch(stopLoading());
    })
    .catch((e) => {
      console.log(e);
    });
};

export const uploadNewTamplate = (tamplate: TamplateI, image: File) => (
  dispatch: Function,
  getState: Function
) => {
  delete tamplate.imageUrl;
  let formData = new FormData();
  formData.append("image", image);
  let data = {
    ...tamplate,
  };
  formData.append("data", JSON.stringify(data));
  dispatch(setLoading());
  axios
    .post("api/inventory/tamplats", formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: tamplateACtionTypes.ADD_NEW_TAMPLATE,
        payload: res.data,
      });
      dispatch(stopLoading());
    })
    .catch((e) => {
      console.log(e);
      dispatch(stopLoading());
    });
};

export const updateTamplate = (tamplate: TamplateI, image: File) => (
  dispatch: Function,
  getState: Function
) => {
  delete tamplate.imageUrl;
  let formData = new FormData();
  formData.append("image", image);
  let data = {
    ...tamplate,
  };
  formData.append("data", JSON.stringify(data));
  dispatch(setLoading());
  axios
    .patch("api/inventory/tamplats", formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: tamplateACtionTypes.UPDATE_TAMPLATE,
        payload: res.data,
      });
      dispatch(stopLoading());
    })
    .catch((error) => {
      console.log(error);
      dispatch(stopLoading());
    });
};

export const deleteTamplate = (tamplate: TamplateI) => (
  dispatch: Function,
  getState: Function
) => {
  dispatch(setLoading());
  axios
    .delete(`api/inventory/tamplats/${tamplate._id!}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: tamplateACtionTypes.DELETE_TAMPLATE,
        payload: tamplate["_id"],
      });
      dispatch(stopLoading());
    })
    .catch((e) => {
      console.log(e);
      dispatch(stopLoading());
    });
};
