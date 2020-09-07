import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
//reduceres
import { TamplatesReducer } from "./reducers/tamplate.reducer";
import authReducer from "./reducers/auth.reducer";
import { uiReducer } from "./reducers/ui.reducer";
// import favoritsReducer from "";
// import shoppingListReducer from "";
// import uiReducer from "";

//TODO:determin if keeping tamplates here is a good idea
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tamplates", "auth"],
  blacklist: ["ui"],
};

const rootReducer = combineReducers({
  tamplates: TamplatesReducer,
  auth: authReducer,
  ui: uiReducer,
  // favorits: favoritsReducer,
  // shoppingList: shoppingListReducer,
  // ui: uiReducer,
});

export default persistReducer(persistConfig, rootReducer);
