import "../styles/Login.css";
import { useForm } from "react-hook-form";
import Button from "../component/Button";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // 나머지 제출 로직
    console.log(data);
  };
  return (
    <div className={"flex flex-col justify-center items-center my-4"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <label>이름</label>
          <input
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
        {/* 중복확인 추가해야 됨 */}
        <div className="inputField">
          <label>닉네임</label>
          <div className={"flex flex-row justify-center items-center"}>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              {...register("nickname", {
                required: "빈 칸 없이 작성해주세요.",
              })}
              style={{ width: "283px" }}
            />
            <Button width="50px" height="30px" text="확인" fontSize="15px" />
          </div>
          <div className="error-message">
            {errors.nickname && errors.nickname.message}
          </div>
        </div>
        <div className="inputField">
          <label>생년월일</label>
          <input
            type="date"
            placeholder="생년월일을 입력하세요."
            {...register("birth", { required: "빈 칸 없이 작성해주세요." })}
          />
          <div className="error-message">
            {" "}
            {errors.birth && errors.birth.message}
          </div>
        </div>
        {/* 이메일 형식 확인 */}
        <div className="inputField">
          <label>이메일</label>
          <input
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
        {/* 비밀번호 형식 확인 */}
        <div className="inputField">
          <label>비밀번호</label>
          <input
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
        {/* 비밀번호 일치 확인 */}
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
    </div>
  );
};
export default Signup;
