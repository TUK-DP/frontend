import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // 나머지 제출 로직
    console.log(data);
  };
  return (
    <div id="screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <label>이름</label>
          <input
            type="text"
            placeholder="이름을 입력하세요."
            {...register("username", { required: "이름을 입력해주세요." })}
          />
          <div className="error-message">
            {errors.username && errors.username.message}
          </div>
        </div>
        <div className="inputField">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password", { required: "비밀번호를 입력해주세요." })}
          />
          <div className="error-message">
            {errors.password && errors.password.message}
          </div>
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
