import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryController from "../api/diary.controller";
import { useSelector } from "react-redux";
import Loading from "../component/Loading";
import Button from "../component/Button";
//일기 작성 페이지
const Diary = () => {
  const navigate = useNavigate();
  const { year, month, day } = useSelector((state) => state.DiaryDate);
  const [isSaving, setIsSaving] = useState(false);
  //textarea의 내용을 받아오는 함수
  const handleContentChange = (event) => {
    setDiary({ ...diary, content: event.target.value });
  };
  //api 요청을 위해 날짜를 포맷팅
  const dateFormat = () => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 <= 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate())
    );
  };
  //api 요청 시, body 형식
  const [diary, setDiary] = useState({
    userId: 2,
    title: "string",
    content: "",
    date: dateFormat(),
  });
  //일기 저장 api 호출
  const saveDiary = async () => {
    console.log("눌림");
    if (diary.content === "") {
      return alert("내용을 작성해주세요.");
    }
    setIsSaving(true);
    await DiaryController.writeDiary(diary);
    console.log("저장됨");
    navigate("/calendar");
  };

  return (
    <div
      className={
        "flex flex-col bg-[#e0f4ff] h-full w-full justify-center items-center"
      }
    >
      {isSaving ? <Loading text="일기 저장 중..." /> : null}
      <div
        style={{
          fontSize: "23px",
          fontWeight: "bold",
          margin: "20px 0",
          textAlign: "left",
          width: "85%",
        }}
      >
        {diary.date}
      </div>
      <textarea
        className={
          "w-11/12 h-full rounded-3xl text-xl p-4 font-bold focus:outline-none"
        }
        placeholder="일기를 작성해주세요."
        value={diary.content}
        onChange={handleContentChange}
      ></textarea>
      <div className={"flex flex-row w-11/12 gap-2 my-5"}>
        <Button width="50%" height="50px" text="음성작성" />
        <Button
          width="50%"
          height="50px"
          text="작성완료"
          onClick={saveDiary}
          disabled={isSaving}
        />
      </div>
    </div>
  );
};

export default Diary;
