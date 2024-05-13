import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SET_PAGENAME } from "../redux/modules/PageName";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserController from "../api/users.controller";
import { SET_USERINFO } from "../redux/modules/UserInfo";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "로그인" });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const submitCallBack = async (data) => {
    // 나머지 제출 로직
    let res;
    try {
      res = await UserController.signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      openModal();
      return;
    }

    const info = res.data.result.user;

    localStorage.setItem("AccessToken", res.data.result.token.AccessToken);
    localStorage.setItem("RefreshToken", res.data.result.token.RefreshToken);
    localStorage.setItem("userId", info.id);

    dispatch({
      type: SET_USERINFO,
      ...info,
    });
    navigate("/");
  };

  const onSubmit = handleSubmit(submitCallBack);

  const emailRegister = register("email", {
    required: "빈 칸 없이 작성해주세요.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "올바른 이메일 형식이 아닙니다.",
    },
  });

  const passwordRegister = register("password", {
    required: "비밀번호를 입력해주세요.",
  });

  return {
    onSubmit,
    isModalOpen,
    closeModal,
    emailRegister,
    passwordRegister,
    errors,
  };
};

export default useLogin;
