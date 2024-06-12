import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";

function DiaryListCop({ id }) {
  //날짜리스트랑 리스트 길이 추가 필요
  const navigate = useNavigate();
  return (
    <div className="mt-3">
      <div
        className="font-bold text-xl"
        onClick={() => navigate("/diarycontent")}
      >
        1. 날짜
      </div>
    </div>
  );
}

function SearchDiary() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [option, setOption] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    if (event.target.value > endDate) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="mt-3 border-b-2 pb-4">
      <div className="flex items-center">
        <label>시작날짜 :</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        ></input>
      </div>
      <div className="flex items-center mb-4">
        <label>종료날짜 :</label>
        <input
          type="date"
          min={startDate}
          value={endDate}
          onChange={handleEndDateChange}
        ></input>
      </div>
      <div className="flex justify-end mb-3 text-xl">
        <select
          value={option}
          onChange={(event) => setOption(event.target.value)}
        >
          <option value="" disabled>
            옵션을 선택하세요
          </option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </select>
      </div>
      <Button text={"검색"} width={"100%"} />
    </div>
  );
}

const DiaryManagement = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserInfo);

  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "일기 관리" });
  }, [dispatch]);

  return (
    <div>
      <SearchDiary />
      <DiaryListCop id={userInfo.userId} />
    </div>
  );
};

export default DiaryManagement;
