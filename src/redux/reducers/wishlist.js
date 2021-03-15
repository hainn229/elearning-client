import * as Types from "../../constants/constants";
let defaultState = {
  data: [],
};
let wishlistReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.WISHLIST: {
      return { ...state, data: action.payload };
    }
    default:
      return state;
  }
};
export default wishlistReducer;
