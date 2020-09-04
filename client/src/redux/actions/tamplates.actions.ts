import tamplateACtionTypes from "../types/tamplates.types";
import axios from "axios";
import { TamplateI } from "../../types/interfaces";

export const getTamplates = () => (dispatch: Function) => {
  axios.get("http://localhost:5000/api/inventory/tamplats").then((res) => {
    dispatch({
      type: tamplateACtionTypes.SET_TAMPLATES,
      payload: res.data,
    });
  });
};

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
    .post("http://localhost:5000/api/inventory/tamplats", formData, {
      headers: headers,
    })
    .then((res) => console.log(res.data));
};
