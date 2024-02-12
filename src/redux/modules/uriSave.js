const URI_SAVE = "URI_SAVE";

export const saveUri = (uri) => ({
  type: URI_SAVE,
  payload: uri,
});

const initialState = {
  uri: "/",
};

export default function uriSave(state = initialState, action) {
  switch (action.type) {
    case URI_SAVE:
      return Object.assign({}, state, {
        uri: action.uri,
      });
    default:
      return state;
  }
}
