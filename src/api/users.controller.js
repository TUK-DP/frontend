import { Api } from "./common.controller";

class UserController extends Api {
  // 회원가입
  signUp = async (userData) => {
    return await this.post("/users/signup", { data: userData });
  };
  // 로그인
  signIn = async (loginData) => {
    return await this.post("/users/login", { data: loginData });
  };
  //닉네임 중복확인
  checkNickname = async (nickname) => {
    return await this.post("/users/checknickname", { data: nickname });
  };
  // 자동 로그인
  // 회원 정보 수정
  // 회원탈퇴
}

export default new UserController();
