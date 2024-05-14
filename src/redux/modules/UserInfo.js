export const SET_USERINFO = "SET_USERINFO";

export const initialState = {
  userId: "",
  email: "",
  password: "",
  nickname: "",
  birth: "",
  created_at: "",
  updated_at: "",
};

export default function UserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_USERINFO:
      if (!action.userId) {
        action.userId = action.id;
      }
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        password: action.password,
        nickname: action.nickname,
        birth: action.birth,
        created_at: action.created_at,
        updated_at: action.updated_at,
      };
    default:
      return state;
  }
}
