const SET_FONT_SIZE = "SET_FONT_SIZE";

export const setFontSize = (size) => ({
  type: SET_FONT_SIZE,
  payload: size,
});

const initialState = "16px";

const fontSizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FONT_SIZE:
      return action.payload;
    default:
      return state;
  }
};

export default fontSizeReducer;
