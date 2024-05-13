import { useEffect, useState } from "react";
import UsersController from "../api/users.controller";
import { useDispatch } from "react-redux";
import { SET_USERINFO } from "../redux/modules/UserInfo";
import { useNavigate } from "react-router-dom";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let AccessToken = localStorage.getItem("AccessToken");
  let RefreshToken = localStorage.getItem("RefreshToken");
  let userId = localStorage.getItem("userId");

  const [loading, setLoading] = useState(true);

  const autoLogin = async () => {
    setLoading(true);

    const GO_LOGIN_PAGE = () => {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("userId");
      setLoading(false);
      navigate("/login");
    };

    if (!userId || !AccessToken || !RefreshToken) {
      GO_LOGIN_PAGE();
      return;
    }

    let res;
    try {
      res = await UsersController.autoLogin({
        userId,
        AccessToken,
        RefreshToken,
      });
    } catch (error) {
      GO_LOGIN_PAGE();
      return;
    }

    const { isSuccess, result } = res.data;

    // 로그인 페이지로 이동
    if (!isSuccess) {
      GO_LOGIN_PAGE();
      return;
    }

    console.log("자동 로그인 성공");

    const info = result.user;

    dispatch({
      type: SET_USERINFO,
      userId: info.id,
      email: info.email,
      password: info.password,
      nickname: info.nickname,
      birth: info.birth,
      created_at: info.created_at,
      updated_at: info.updated_at,
    });

    setLoading(false);
  };

  useEffect(() => {
    console.log("자동 로그인 시도");
    // 토큰이 있다면 자동로그인 요청
    autoLogin();
  }, []);

  return { loading };
};

export default useAutoLogin;
