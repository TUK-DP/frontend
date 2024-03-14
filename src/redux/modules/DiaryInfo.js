export const CHANGE_DIARYID = "CHANGE_DIARYID";
export const CHANGE_CONTENT = "CHANGE_CONTENT";
export const CHANGE_DATE = "CHANGE_DATE";

const initialState = {
  userId: 2,
  diaryId: 0,
  title: "string",
  content: "",
  date: 0
};

export default function DiaryInfo(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DIARYID:
      return {
        ...state,
        diaryId: action.diaryId,
      };
    case CHANGE_CONTENT:
      return {
        ...state,
        content: action.content,
      };
    case CHANGE_DATE:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
}
