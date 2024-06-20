import React, { useEffect, useState } from "react";
import UserController from "../api/users.controller";
import { useForm } from "react-hook-form";
import Button from "../component/Button";
import Modal from "../component/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";

const Signup = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "회원가입" });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  //form 제출
  const onSubmit = async (data) => {
    try {
      const res = await UserController.signUp({
        username: data.username,
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        birth: data.birth,
      });
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const [nickname, setNickname] = useState("");
  const nicknameRegister = register("nickname", {
    required: "빈 칸 없이 작성해주세요.",
  });
  //onChange 두 번 호출
  const handleChange = (event) => {
    console.log(event.target.value);
    setNickname(event.target.value);
    nicknameRegister.onChange(event);
  };
  //닉네임 중복확인
  const checkNickname = async () => {
    if (nickname == "") return;
    try {
      const res = await UserController.checkNickname({ nickname: nickname });
      console.log(nickname);
      console.log(res);
      setIsNicknameExist(false);
    } catch (error) {
      console.log(error);
      setIsNicknameExist(true);
    }
    setIsModalOpen(true);
  };
  //닉네임 중복확인 결과 표시
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isNicknameExist, setIsNicknameExist] = useState();

  return (
    <div className={"flex flex-col justify-center items-center my-4"}>
      <form onSubmit={handleSubmit(onSubmit)} className={"mb-5"}>
        <div className="inputField">
          <label>이름</label>
          <input
            className="input"
            type="text"
            placeholder="이름을 입력하세요."
            {...register("username", {
              required: "빈 칸 없이 작성해주세요.",
              minLength: {
                value: 2,
                message: "두 글자 이상 입력해주세요.",
              },
            })}
          />
          <div className="error-message">
            {errors.username && errors.username.message}
          </div>
        </div>
        <div className="inputField">
          <label>닉네임</label>
          <div className={"flex flex-row justify-center items-center"}>
            <input
              className="input"
              value={nickname}
              {...nicknameRegister}
              onChange={handleChange}
              type="text"
              placeholder="닉네임을 입력하세요."
              style={{ width: "283px" }}
            />
            <Button
              width="50px"
              height="30px"
              text="확인"
              fontSize="15px"
              onClick={() => {
                checkNickname();
              }}
            />
          </div>
          <div className="error-message">
            {errors.nickname && errors.nickname.message}
          </div>
        </div>
        <div className="inputField">
          <label>생년월일</label>
          <input
            className="input"
            type="date"
            placeholder="생년월일을 입력하세요."
            {...register("birth", { required: "빈 칸 없이 작성해주세요." })}
          />
          <div className="error-message">
            {errors.birth && errors.birth.message}
          </div>
        </div>
        <div className="inputField">
          <label>이메일</label>
          <input
            className="input"
            type="text"
            placeholder="이메일을 입력하세요."
            {...register("email", {
              required: "빈 칸 없이 작성해주세요.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
          />
          <div className="error-message">
            {errors.email && errors.email.message}
          </div>
        </div>
        <div className="inputField">
          <label>비밀번호</label>
          <input
            className="input"
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password", {
              required: "빈 칸 없이 작성해주세요.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다.",
              },
            })}
          />
          <div className="error-message">
            {errors.password && errors.password.message}
          </div>
        </div>
        <div className="inputField">
          <label>비밀번호 확인</label>
          <input
            className="input"
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("passwordChk", {
              required: "빈 칸 없이 작성해주세요.",
              validate: (value) =>
                value === watch("password") || "비밀번호가 일치하지 않습니다.",
            })}
          />
          <div className="error-message">
            {errors.passwordChk && errors.passwordChk.message}
          </div>
        </div>
        <button id="loginBtn" type="submit">
          완료
        </button>
      </form>
      {isModalOpen && isNicknameExist && (
        <Modal onClose={closeModal} content="다른 닉네임을 입력해주세요." />
      )}
      {isModalOpen && !isNicknameExist && (
        <Modal onClose={closeModal} content="사용 가능한 닉네임입니다." />
      )}
    </div>
  );
};

export default Signup;
