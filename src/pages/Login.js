import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div id="screen">
      <form>
        <div className="inputField">
          <label>이름</label>
          <input type="text" placeholder="이름을 입력하세요." />
        </div>
        <div className="inputField">
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력하세요." />
        </div>
      </form>
      <button id="loginBtn">로그인</button>
      <div id="container">
        <div>회원이 아니신가요?</div>
        <Link to="/signup" style={{ color: "inherit" }}>
          <div style={{}}>회원가입</div>
        </Link>
      </div>
    </div>
  );
};
export default Login;
