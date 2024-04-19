import React, { useEffect, useState } from "react";
import "../styles/Calendar.css";
import left from "../assets/left.png";
import Right from "../assets/Right.png";
import { useNavigate } from "react-router-dom";
import DiaryShow from "./DiaryShow.js";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_DAY, CHANGE_MONTH } from "../redux/modules/DiaryDate.js";
import {
  CHANGE_DIARYID,
  CHANGE_CONTENT,
  CHANGE_DATE,
} from "../redux/modules/DiaryInfo.js";
import DiaryController from "../api/diary.controller.js";

const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { year, month, day } = useSelector((state) => state.DiaryDate);
  const [isDiaryExist, setIsDiaryExist] = useState();
  const [isGetDiaryComplete, setIsGetDiaryComplete] = useState(false);
  // userId는 한 번 로그인 이후 고정
  const userId = useSelector((state) => state.UserInfo.userId);
  // const { title, content, date } = useSelector((state) => state.DiaryInfo);

  // 현재 날짜를 가져옴
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줌
  const currentDay = currentDate.getDate();

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

  //선택한 날의 일기 가져오기
  const getDiary = async () => {
    setIsGetDiaryComplete(false);
    if (
      year > currentYear ||
      (year === currentYear && month > currentMonth) ||
      (year === currentYear && month === currentMonth && day > currentDay)
    )
      return;
    try {
      //일기가 존재함
      const res = await DiaryController.searchDiary({
        userId: userId,
        date: dateFormat(),
      });
      console.log(res.data);
      setIsDiaryExist(res.data.isSuccess);

      dispatch({ type: CHANGE_DIARYID, diaryId: res.data.result.diaryId });
      dispatch({ type: CHANGE_CONTENT, content: res.data.result.content });
    } catch (error) {
      //일기가 존재하지 않음
      console.log(error.response.data);
      setIsDiaryExist(error.response.data.isSuccess);
    }
    setIsGetDiaryComplete(true);
  };

  useEffect(() => {
    // 일기 데이터 가져오기
    getDiary();
    const initialFormatDate = dateFormat();
    dispatch({ type: CHANGE_DATE, date: initialFormatDate });
  }, [year, month, day]);

  // 이전 달로 이동
  const prevMonth = () => {
    dispatch({ type: CHANGE_MONTH, number: -1 });
  };

  // 다음 달로 이동
  const nextMonth = () => {
    dispatch({ type: CHANGE_MONTH, number: 1 });
  };

  // 현재 달의 첫째 날의 요일을 반환합니다. (0: 일요일, 1: 월요일, ...)
  const getFirstDayOfMonth = () => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    return firstDayOfMonth.getDay();
  };

  // 현재 달의 날짜 배열 생성 (날짜와 요일을 모두 포함)
  const getDaysInMonth = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];

    // 빈 셀을 삽입하여 첫째 날이 올바른 요일에 위치하도록 합니다.
    for (let i = 0; i < getFirstDayOfMonth(); i++) {
      days.push("");
    }

    // 실제 날짜를 삽입합니다.
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    // 마지막 주의 빈 셀을 삽입하여 항상 6주가 표시되도록 합니다.
    while (days.length % 42 !== 0) {
      days.push("");
    }

    return days;
  };

  //클릭한 날짜로 변경
  const handleDateClick = (day) => {
    if (day !== "") {
      dispatch({ type: CHANGE_DAY, number: day });
    }
  };

  // 날짜 셀을 렌더링합니다.
  const renderDays = () => {
    const days = getDaysInMonth();
    const rows = [];
    let cells = [];

    days.forEach((selectDay, index) => {
      const isSelected = selectDay !== "" && day === selectDay;

      if (index % 7 !== 0) {
        cells.push(
          <td
            key={index}
            className={`${selectDay === "" ? "empty" : ""} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => handleDateClick(selectDay)}
          >
            {selectDay}
          </td>
        );
      } else {
        rows.push(cells);
        cells = [];
        cells.push(
          <td
            key={index}
            className={`${selectDay === "" ? "empty" : ""} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => handleDateClick(selectDay)}
          >
            {selectDay}
          </td>
        );
      }

      if (index === days.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, index) => <tr key={index}>{row}</tr>);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="month-nav">
          <img
            src={left}
            onClick={prevMonth}
            height="20"
            style={{ paddingLeft: "25px" }}
          />
          <span
            style={{ fontSize: "20px", fontWeight: "bold", color: "#999999" }}
          >
            {`${year}년 ${month}월`}
          </span>
          <img
            src={Right}
            onClick={nextMonth}
            height="20"
            style={{ paddingRight: "25px" }}
          />
        </div>
        <table className="calendar">
          <thead>
            <tr>
              <th>SUN</th>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THR</th>
              <th>FRI</th>
              <th>SAT</th>
            </tr>
          </thead>
        </table>
      </div>
      <table className="calendar">
        <tbody>{renderDays()}</tbody>
      </table>
      <hr style={{ borderColor: "#f8f8f8" }} />
      {/* 작성된 일기 없으면 버튼표시, 아니면 일기 표시 */}
      {isGetDiaryComplete && isDiaryExist && <DiaryShow />}
      {isGetDiaryComplete && !isDiaryExist && (
        <div id="btnBox">
          <div
            id="btn_diary"
            onClick={() => {
              navigate("/diarywrite");
            }}
          >
            일기작성
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
