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

export const uploadNewTamplate = (tamplate: TamplateI) => (
  dispatch: Function
) => {
  axios.post("api/inventory/tamplats", { ...tamplate });
};
