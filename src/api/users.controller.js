import { Api } from "./common.controller";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 회원 정보 수정 메서드
const updateUser = async ({ userData, accessToken }) => {
  return await axiosInstance.put("/users", userData, {
    headers: {
      AccessToken: `${accessToken}`,
    },
  });
};

class UserController extends Api {
  // 회원가입
  signUp = async (userData) => {
    return await this.post("/users/signup", { data: userData });
  };

  // 로그인
  signIn = async (loginData) => {
    return await this.post("/users/login", { data: loginData });
  };

  // 닉네임 중복확인
  checkNickname = async (nickname) => {
    return await this.post("/users/checknickname", { data: nickname });
  };

  // 자동 로그인
  autoLogin = async ({ userId, AccessToken, RefreshToken }) => {
    return await this.get(`/users/${userId}/auto/login`, {
      data: {
        headers: {
          AccessToken,
          RefreshToken,
          "Content-Type": "application/json",
        },
      },
    });
  };

  // 회원 정보 수정
  updateUser = updateUser;

  // 회원탈퇴
}

export default new UserController();
