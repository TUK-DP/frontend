import { Api } from "./common.controller";

class UserController extends Api {
  // 회원가입
  signUp = async (userData) => {
    return await this.post("/users/signup", { data: userData });
  };
  // 로그인
  signIn = async (loginData) => {
    return await this.post("/users/signin", { data: loginData });
  };
  // 자동 로그인
  // 회원 정보 수정
  // 회원탈퇴
}

export default new UserController();
