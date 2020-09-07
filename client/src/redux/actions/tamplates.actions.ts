import tamplateACtionTypes from "../types/tamplates.types";
import axios from "axios";
import { TamplateI } from "../../types/interfaces";

export const getTamplates = () => (dispatch: Function) => {
  axios.get("api/inventory/tamplats").then((res) => {
    dispatch({
      type: tamplateACtionTypes.SET_TAMPLATES,
      payload: res.data,
    });
  });
};

//TODO:when successfully deleting a tamplate just update local
//stet to reflact changes on server
export const uploadNewTamplate = (tamplate: TamplateI, image: File) => (
  dispatch: Function
) => {
  delete tamplate.imageUrl;
  let formData = new FormData();
  formData.append("image", image);
  let data = {
    ...tamplate,
  };
  formData.append("data", JSON.stringify(data));
  const headers = {
    "Content-Type": undefined,
  };
  axios
    .post("api/inventory/tamplats", formData, {
      headers: headers,
    })
    .then((res) =>
      dispatch({
        type: tamplateACtionTypes.ADD_NEW_TAMPLATE,
        payload: res.data,
      })
    );
};

export const updateTamplate = (tamplate: TamplateI, image: File) => (
  dispatch: Function
) => {
  delete tamplate.imageUrl;
  let formData = new FormData();
  formData.append("image", image);
  let data = {
    ...tamplate,
  };
  formData.append("data", JSON.stringify(data));
  const headers = {
    "Content-Type": undefined,
  };
  axios
    .patch("api/inventory/tamplats", formData, {
      headers: headers,
    })
    .then((res) => {
      dispatch({
        type: tamplateACtionTypes.UPDATE_TAMPLATE,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
