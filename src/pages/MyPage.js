import User from "../assets/user.png";
import MyPageList from "../component/MyPageList";
import Diary from "../assets/diary.png";
const MyPage = () => {
  return (
    <div className={"flex justify-start flex-col px-5 py-2.5 h-full"}>
      {/* 사진, 이름, 닉네임 */}
      <div className={"flex flex-row p-2.5 justify-start gap-2.5"}>
        <img
          src={User}
          alt="user"
          width="100"
          className={"border-1 rounded-full"}
        />
        <div className={"flex p-2.5 flex-col justify-center flex-grow gap-2"}>
          <p className={"text-2xl font-semibold"}>이희연님</p>
          <p className={"text-base text-gray-500"}>닉네임: 히동구리</p>
        </div>
      </div>
      {/* 마이페이지 리스트 */}
      <div className={"flex flex-col py-5 "}>
        <MyPageList src={User} text="회원정보 수정" />
        <MyPageList src={Diary} text="일기 관리" />
      </div>
    </div>
  );
};
export default MyPage;
