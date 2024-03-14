const URL_SAVE = "URL_SAVE";

export const saveUrl = (url) => ({
  type: URL_SAVE,
  payload: url,
});

const initialState = {
  url: "/",
};

export default function urlSave(state = initialState, action) {
  switch (action.type) {
    case URL_SAVE:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
}
