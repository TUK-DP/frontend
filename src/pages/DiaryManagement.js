import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import diaryController from "../api/diary.controller";

function DiaryListCop({ diaryDates }) {
  const navigate = useNavigate();
  const formattedDates = diaryDates.map((dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    return formattedDate;
  });
  const handleClick = (index) => {
    navigate("/calendar", { state: diaryDates[index] });
  };
  return (
    <div>
      {diaryDates.length > 0 ? (
        <div>
          {formattedDates.map((date, index) => (
            <div
              className="my-3 flex bg-[#e0f4ff] h-[5rem] items-center justify-between px-2"
              onClick={() => handleClick(index)}
              key={index}
            >
              <div className="pl-3 text-[#7a7a7a] text-xl bg-white w-[50%] h-12 flex items-center rounded-xl">
                {date}
              </div>
              <div className="text-xl text-[#82aae3] font-bold">
                일기 확인하기 {">"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xl flex justify-center mt-3">
          일기가 존재하지 않습니다.
        </div>
      )}
    </div>
  );
}

function SearchDiary({ id, setDiaries }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [option, setOption] = useState("");

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");

  const previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  const previousYear = previousDate.getFullYear();
  const previousMonth = String(previousDate.getMonth() + 1).padStart(2, "0");
  const previousDay = String(previousDate.getDate()).padStart(2, "0");

  const defaultDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const defaultPreviousDate = `${previousYear}-${previousMonth}-${previousDay}`;

  useEffect(() => {
    searchDiaryList();
  }, [option]);

  useEffect(() => {
    setStartDate(defaultPreviousDate);
    setEndDate(defaultDate);
  }, [defaultPreviousDate]);

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    if (newStartDate > endDate) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const searchDiaryList = async () => {
    try {
      const response = await diaryController.searchDiaryList({
        userId: id,
        startDate: startDate,
        finishDate: endDate,
        sortBy: option,
      });
      const diaries = response.data.result.diaries;
      const createDateList = diaries.map((diary) => diary.createDate);
      setDiaries(createDateList);
    } catch (error) {
      console.error("기간별 일기 조회 중 오류", error);
    }
  };

  return (
    <div className="mt-3 border-b-2 pb-4">
      <div className="flex items-center justify-evenly">
        <input
          className="text-xl"
          type="date"
          defaultValue={defaultPreviousDate}
          max={endDate}
          value={startDate}
          onChange={handleStartDateChange}
        />
        <div className="text-xl">부터</div>
      </div>
      <div className="flex items-center mb-4 justify-evenly">
        <input
          className="text-xl"
          type="date"
          min={startDate}
          max={defaultDate}
          onChange={handleEndDateChange}
          defaultValue={defaultDate}
          value={endDate}
        />
        <div className="text-xl">까지</div>
      </div>
      <div className="flex justify-end mb-3 text-xl">
        <select
          value={option}
          onChange={(event) => setOption(event.target.value)}
        >
          <option value="DES_CREATE_DATE">최신순</option>
          <option value="ASC_CREATE_DATE">오래된순</option>
        </select>
      </div>
      <Button text={"검색"} width={"100%"} onClick={() => searchDiaryList()} />
    </div>
  );
}

const DiaryManagement = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserInfo);
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "일기 관리" });
  }, [dispatch]);

  return (
    <div>
      <SearchDiary id={userInfo.userId} setDiaries={setDiaries} />
      <DiaryListCop diaryDates={diaries} />
    </div>
  );
};

export default DiaryManagement;
