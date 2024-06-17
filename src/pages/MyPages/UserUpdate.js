import React, { useEffect, useState } from "react";
import UserController from "../../api/users.controller";
import { useForm } from "react-hook-form";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGENAME } from "../../redux/modules/PageName";
import axios from "axios";

export const USER_UPDATE_PAGE_PATH = "/userupdate";

const UserUpdate = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserInfo);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "정보 수정" });
  }, [dispatch]);

  useEffect(() => {
    reset(userInfo);
  }, [userInfo, reset]);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
  });
  const onSubmit = async (data) => {
    const accessToken = localStorage.getItem("AccessToken");
    if (!accessToken) {
      console.error("엑세스 토큰이 없습니다.");
      return;
    }

    const userData = {
      id: userInfo.userId,
      username: data.username,
      nickname: data.nickname,
      email: data.email,
      password: data.password,
      birth: data.birth,
    };

    try {
      const response = await axiosInstance.put("/users", userData, {
        headers: {
          AccessToken: `${accessToken}`,
        },
      });
      console.log("성공");
      navigate("/mypage");
    } catch (error) {
      console.log("정보 수정 중 오류", error);
    }
  };

  const [nickname, setNickname] = useState("");
  const nicknameRegister = register("nickname", {
    required: "빈 칸 없이 작성해주세요.",
  });

  const handleChange = (event) => {
    setNickname(event.target.value);
    nicknameRegister.onChange(event);
  };

  const checkNickname = async () => {
    if (nickname === "") return;
    try {
      const res = await UserController.checkNickname({ nickname });
      setIsNicknameExist(false);
    } catch (error) {
      console.log(error);
      setIsNicknameExist(true);
    }
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isNicknameExist, setIsNicknameExist] = useState(false);

  if (!userInfo) return null;

  return (
    <div className="flex flex-col justify-center items-center my-4">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <div className="inputField">
          <label>이름</label>
          <input
            type="text"
            defaultValue={userInfo.username}
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
          <div className="flex flex-row justify-center items-center">
            <input
              {...nicknameRegister}
              onChange={handleChange}
              type="text"
              defaultValue={userInfo.nickname}
              style={{ width: "283px" }}
            />
            <Button
              width="50px"
              height="30px"
              text="확인"
              fontSize="15px"
              onClick={checkNickname}
            />
          </div>
          <div className="error-message">
            {errors.nickname && errors.nickname.message}
          </div>
        </div>
        <div className="inputField">
          <label>생년월일</label>
          <input
            type="date"
            defaultValue={userInfo.birth}
            {...register("birth", { required: "빈 칸 없이 작성해주세요." })}
          />
          <div className="error-message">
            {errors.birth && errors.birth.message}
          </div>
        </div>
        <div className="inputField">
          <label>이메일</label>
          <input
            type="text"
            defaultValue={userInfo.email}
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
            type="password"
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

export default UserUpdate;
