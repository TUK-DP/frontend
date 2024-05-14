import "../styles/Login.css";
import { Link } from "react-router-dom";
import Modal from "../component/Modal";
import useLogin from "../hooks/useLogin";

const EmailInputComp = ({ emailRegister, errors }) => {
  return (
    <div className="inputField">
      <label>이메일</label>
      <input
        type="email"
        placeholder="이메일을 입력하세요."
        {...emailRegister}
      />
      <div className="error-message">
        {errors.email && errors.email.message}
      </div>
    </div>
  );
};

const PasswordInputComp = ({ passwordRegister, errors }) => {
  return (
    <div className="inputField">
      <label>비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요."
        {...passwordRegister}
      />
      <div className="error-message">
        {errors.password && errors.password.message}
      </div>
    </div>
  );
};

const LoginButtonComp = () => {
  return (
    <button id="loginBtn" type="submit" className={"mt-10"}>
      로그인
    </button>
  );
};

const Login = () => {
  let {
    onSubmit,
    isModalOpen,
    closeModal,
    emailRegister,
    passwordRegister,
    errors,
  } = useLogin();

  return (
    <div id="screen">
      <Modal
        isModalOpen={isModalOpen}
        content={"닉네임 또는 비밀번호가 일치하지 않습니다."}
        onClose={closeModal}
      />
      <form onSubmit={onSubmit}>
        <EmailInputComp emailRegister={emailRegister} errors={errors} />
        <PasswordInputComp
          passwordRegister={passwordRegister}
          errors={errors}
        />
        <LoginButtonComp />
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
