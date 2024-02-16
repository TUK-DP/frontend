import "../styles/Login.css";

const Signup = () => {
  return (
    <div id="screen">
      <form>
        <div className="inputField">
          <label>이름</label>
          <input type="text" placeholder="이름을 입력하세요." />
        </div>
        <div className="inputField">
          <label>닉네임</label>
          <input type="text" placeholder="닉네임을 입력하세요." />
        </div>
        <div className="inputField">
          <label>생년월일</label>
          <input type="date" placeholder="생년월일을 입력하세요." />
        </div>
        <div className="inputField">
          <label>이메일</label>
          <input type="email" placeholder="이메일을 입력하세요." />
        </div>
        <div className="inputField">
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력하세요." />
        </div>
        <div className="inputField">
          <label>비밀번호 확인</label>
          <input type="password" placeholder="비밀번호를 입력하세요." />
        </div>
      </form>
      <button id="loginBtn" style={{ marginTop: "30px" }}>
        완료
      </button>
    </div>
  );
};
export default Signup;
