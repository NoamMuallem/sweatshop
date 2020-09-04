import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
//reduceres
import { TamplatesReducer } from "./reducers/tamplate.reducer";
// import favoritsReducer from "";
// import shoppingListReducer from "";
// import uiReducer from "";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorits, shoppingList"],
  blacklist: ["ui"],
};

const rootReducer = combineReducers({
  tamplates: TamplatesReducer,
  // favorits: favoritsReducer,
  // shoppingList: shoppingListReducer,
  // ui: uiReducer,
});

export default persistReducer(persistConfig, rootReducer);
