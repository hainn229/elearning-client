import { combineReducers } from "redux";
import signInReducer from "./signin";
import coursesReducer from "./courses";
import wishlistReducer from "./wishlist";
export const myReducers = combineReducers({
    signInReducer,
    coursesReducer,
    wishlistReducer,
});
