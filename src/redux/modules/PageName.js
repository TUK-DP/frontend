export const SET_PAGENAME = "SET_PAGENAME";

export const initialState = {
  pageName: "Re-Memory",
};

export default function PageName(state = initialState, action) {
  switch (action.type) {
    case SET_PAGENAME:
      return {
        ...state,
        pageName: action.pageName,
      };
    default:
      return state;
  }
}
