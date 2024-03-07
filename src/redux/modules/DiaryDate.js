export const CHANGE_YEAR = "CHANGE_YEAR";
export const CHANGE_MONTH = "CHANGE_MONTH";
export const CHANGE_DAY = "CHANGE_DAY";

const initialState = {
  year: parseInt(new Date().getFullYear(), 10),
  month: parseInt(new Date().getMonth() + 1, 10),
  day: parseInt(new Date().getDate(), 10),
};

export default function DiaryDate(state = initialState, action) {
  switch (action.type) {
    // case CHANGE_YEAR:
    //   return {
    //     ...state,
    //     year: state.year + action.number,
    //   };
    case CHANGE_MONTH:
      const newMonth = state.month + action.number;
      // 월이 1 미만이면 전 년도 12월로 설정
      if (newMonth < 1) {
        return {
          ...state,
          year: state.year - 1,
          month: 12,
        };
      }
      // 월이 12 초과면 다음 년도 1월로 설정
      else if (newMonth > 12) {
        return {
          ...state,
          year: state.year + 1,
          month: 1,
        };
      }
      // 그 외의 경우는 그대로 업데이트
      else {
        return {
          ...state,
          month: newMonth,
        };
      }
    case CHANGE_DAY:
      return {
        ...state,
        day: action.number,
      };

    default:
      return state;
  }
}
