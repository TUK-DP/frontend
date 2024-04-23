export const SELECT_COLOR = "SELECT_COLOR";
export const BRUSH_SIZE = "BRUSH_SIZE";

export const initialState = {
  selectedColor: "#000000",
  brushSize: 3,
};

export default function ImageDiary(state = initialState, action) {
  switch (action.type) {
    case SELECT_COLOR:
      return {
        ...state,
        selectedColor: action.selectedColor,
      };
    case BRUSH_SIZE:
      return {
        ...state,
        brushSize: action.brushSize,
      };
    default:
      return state;
  }
}
