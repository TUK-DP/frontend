import User from "../assets/user.png";
import MyPageList from "../component/MyPageList";
import Diary from "../assets/diary.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SET_PAGENAME } from "../redux/modules/PageName";
import { useNavigate } from "react-router-dom";
import { setFontSize } from "../redux/modules/fontSize";

const UserProfile = () => {
  let navigate = useNavigate();

  let userInfo = useSelector((state) => state.UserInfo);

  const LogOutButton = () => {
    const logout = () => {
      localStorage.clear();
      navigate("/login");
    };

    return (
      <div className={"absolute right-2.5 top-2.5"}>
        <button
          onClick={logout}
          className={"font-bold border-2 rounded-lg p-1"}
        >
          로그아웃
        </button>
      </div>
    );
  };

  return (
    <div
      className={"flex flex-row px-2.5 my-2.5 justify-start gap-2.5 relative"}
    >
      <img src={User} alt="user" className={"rounded-full w-[100px]"} />
      <div className={"flex p-2.5 flex-col justify-center flex-1 gap-2"}>
        <p className={"text-2xl font-semibold"}>{userInfo.nickname}님</p>
        <p className={"text-base text-gray-500"}>이메일: {userInfo.email}</p>
        <LogOutButton />
      </div>
    </div>
  );
};

const Toggle = () => {
  const dispatch = useDispatch();
  const currentFontSize = useSelector((state) => state.fontSize);
  const [isDrop, setIsDrop] = useState(false);

  const fontSizeChange = (size) => {
    dispatch(setFontSize(size));
  };

  const toggleDrop = () => {
    setIsDrop(!isDrop);
  };

  const buttonStyles = (size) => ({
    fontSize: size,
    fontWeight: "bold",
    borderRadius: "10px",
    height: "50px",
    width: "75px",
    border: currentFontSize === size ? "" : "2px solid #ddd",
    backgroundColor: currentFontSize === size ? "#82aae3" : "#e0f4ff",
    color: "black",
  });

  return (
    <div>
      <div className="flex justify-between items-center py-5 border-b-2">
        <span className="text-lg">글씨 크기 조절하기</span>
        <button onClick={toggleDrop} style={{ fontSize: "20px" }}>
          {isDrop ? "▲" : "▼"}
        </button>
      </div>
      {isDrop && (
        <div className="flex justify-between items-center p-4 border-b-2">
          <button
            onClick={() => fontSizeChange("16px")}
            style={buttonStyles("16px")}
          >
            작게
          </button>
          <button
            onClick={() => fontSizeChange("18px")}
            style={buttonStyles("18px")}
          >
            중간
          </button>
          <button
            onClick={() => fontSizeChange("20px")}
            style={buttonStyles("20px")}
          >
            크게
          </button>
        </div>
      )}
    </div>
  );
};

const MyPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "마이페이지" });
  }, []);
  return (
    <div className={"flex justify-start flex-col px-5 py-2.5 h-full"}>
      {/* 사진, 이름, 닉네임 */}
      <UserProfile />

      {/* 마이페이지 리스트 */}
      <div className={"flex flex-col py-5 "}>
        <MyPageList
          src={User}
          text="회원정보 수정"
          onClick={() => navigate("/userupdate")}
        />
        <MyPageList
          src={Diary}
          text="일기 관리"
          onClick={() => navigate("/diarymanagement")}
        />
        <Toggle />
      </div>
    </div>
  );
};
export default MyPage;
