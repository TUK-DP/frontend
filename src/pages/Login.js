import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
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
        <div className="inputField my-5">
          <label>이름</label>
          <input type="text" placeholder="이름을 입력하세요." id="username" />
        </div>
        <div className="inputField my-5">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            id="password"
          />
        </div>
        <button id="loginBtn" type="submit" className={"mt-10"}>
          로그인
        </button>
      </form>
      <div id="container">
        <div>회원이 아니신가요?</div>
        <Link to="/signup" style={{ color: "inherit" }}>
          <div>회원가입</div>
        </Link>
      </div>
    </div>
  );
};
export default Login;
