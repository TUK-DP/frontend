//Ducks 패턴을 따름
//액션 타입
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
//Ducks 패턴에서는 액션 타입을 정의할 때 위처럼 접두사를 붙임(다른 모듈과 이름 중복되지 않기 위해서)

//액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//모듈 초기 상태
const initialState = {
  number: 0,
};

//reducer
export default function ex(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}
