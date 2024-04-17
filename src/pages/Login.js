import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserController from "../api/users.controller";
import Modal from "../component/Modal";
import { useState } from "react";
import { SET_USERINFO } from "../redux/modules/UserInfo";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // 나머지 제출 로직
    console.log(data);
    try {
      const res = await UserController.signIn({
        nickname: data.nickname,
        password: data.password,
      });
      console.log(res.data.result);
      const info = res.data.result;
      dispatch({
        type: SET_USERINFO,
        userId: info.userId,
        email: info.email,
        password: info.password,
        nickname: info.nickname,
        birth: info.birth,
        created_at: info.created_at,
        updated_at: info.updated_at,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsModalOpen(true);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="screen">
      {isModalOpen && (
        <Modal
          content={"닉네임 또는 비밀번호가 일치하지 않습니다."}
          onClose={closeModal}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <label>닉네임</label>
          <input
            type="text"
            placeholder="닉네임을 입력하세요."
            {...register("nickname", { required: "닉네임을 입력해주세요." })}
          />
          <div className="error-message">
            {errors.nickname && errors.nickname.message}
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
