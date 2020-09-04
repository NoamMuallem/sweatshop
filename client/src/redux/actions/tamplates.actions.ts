import tamplateACtionTypes from "../types/tamplates.types";
import axios from "axios";
import { TamplateI } from "../../types/interfaces";
import tamplatesType from "../types/tamplates.types";

export const getTamplates = () => (dispatch: Function) => {
  axios
    .get("http://localhost:5000/api/inventory/tamplats")
    .then((res) => {
      console.log(res);
      dispatch({
        type: tamplateACtionTypes.SET_TAMPLATES,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const uploadNewTamplate = (tamplate: TamplateI) => (
  dispatch: Function
) => {
  axios.post("http://localhost:5000/api/inventory/tamplats", { ...tamplate });
};
