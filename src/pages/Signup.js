import "../styles/Login.css";
import { useForm } from "react-hook-form";
const Signup = () => {
  const onSubmit = (data) => {
    if (
      !data.username ||
      !data.nickname ||
      !data.birth ||
      !data.email ||
      !data.password ||
      !data.passwordChk
    ) {
      alert("빈 칸 없이 작성해주세요.");
      return;
    }

    // 나머지 제출 로직
    console.log(data);
  };
  return (
    <div id="screen">
      <form onSubmit={onSubmit}>
        <div className="inputField">
          <label>이름</label>
          <input type="text" placeholder="이름을 입력하세요." id="username" />
          <div className="error-message"></div>
        </div>
        <div className="inputField">
          <label>닉네임</label>
          <input type="text" placeholder="닉네임을 입력하세요." id="nickname" />
          <div className="error-message"></div>
        </div>
        <div className="inputField">
          <label>생년월일</label>
          <input type="date" placeholder="생년월일을 입력하세요." id="birth" />
          <div className="error-message"></div>
        </div>
        <div className="inputField">
          <label>이메일</label>
          <input type="email" placeholder="이메일을 입력하세요." id="email" />
          <div className="error-message"></div>
        </div>
        <div className="inputField">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            id="password"
          />
          <div className="error-message"></div>
        </div>
        <div className="inputField">
          <label>비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            id="passwordChk"
          />
          <div className="error-message"></div>
        </div>
        <button id="loginBtn" type="submit">
          완료
        </button>
      </form>
    </div>
  );
};
export default Signup;
