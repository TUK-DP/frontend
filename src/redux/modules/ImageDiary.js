const SELECT_COLOR = "SELECT_COLOR";
const BRUSH_SIZE = "BRUSH_SIZE";

export const selectColor = (color) => ({ type: SELECT_COLOR, payload: color });
export const brushSize = (lineWidth) => ({
  type: BRUSH_SIZE,
  payload: lineWidth,
});

const initialState = {
  selectedColor: "#000000",
  lineWidth: 3,
};

export default function ImageDiary(state = initialState, action) {
  switch (action.type) {
    case SELECT_COLOR:
      return {
        ...state,
        selectedColor: action.payload,
      };
    case BRUSH_SIZE:
      return {
        ...state,
        lineWidth: action.payload,
      };
    default:
      return state;
  }
}
