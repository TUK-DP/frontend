// export const CHANGE_DIARYID = "CHANGE_DIARYID";
// export const CHANGE_CONTENT = "CHANGE_CONTENT";
// export const CHANGE_DATE = "CHANGE_DATE";
export const CHANGE_DIARY = "CHANGE_DIARY";

const initialState = {
  diaryId: 0,
  content: "",
  date: 0,
  keywords: [],
};

export default function DiaryInfo(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DIARY:
      return {
        ...state,
        diaryId: action.diaryId,
        content: action.content,
        date: action.date,
        keywords: action.keywords,
      };

    default:
      return state;
  }
}
