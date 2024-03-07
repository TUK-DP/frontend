export const CHANGE_YEAR = "CHANGE_YEAR";
export const CHANGE_MONTH = "CHANGE_MONTH";
export const CHANGE_DAY = "CHANGE_DAY";

const initialState = {
  year: new Date().getFullYear().toString(),
  month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
  day: new Date().getDate().toString().padStart(2, "0"),
};

export default function DiaryDate(state = initialState, action) {
  switch (action.type) {
    // case CHANGE_YEAR:
    //   return {
    //     ...state,
    //     year: (parseInt(state.year, 10) + action.number).toString(),
    //   };
    case CHANGE_MONTH:
      const newMonth = parseInt(state.month, 10) + action.number;
      // 월이 1 미만이면 전 년도 12월로 설정
      if (newMonth < 1) {
        return {
          ...state,
          year: (parseInt(state.year, 10) - 1).toString(),
          month: "12",
        };
      }
      // 월이 12 초과면 다음 년도 1월로 설정
      else if (newMonth > 12) {
        return {
          ...state,
          year: (parseInt(state.year, 10) + 1).toString(),
          month: "01",
        };
      }
      // 그 외의 경우는 그대로 업데이트
      else {
        return {
          ...state,
          month: newMonth.toString().padStart(2, "0"),
        };
      }
    case CHANGE_DAY:
      return {
        ...state,
        day: action.number.toString().padStart(2, "0"),
      };

    default:
      return state;
  }
}
