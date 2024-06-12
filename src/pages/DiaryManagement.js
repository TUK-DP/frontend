import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";

function DiaryListCop() {
  //날짜리스트랑 리스트 길이 추가 필요
  //날짜를 diarycontent로 넘겨주면 diarycontent에서 날짜에 해당하는 일기내용 보여주도록 추가 필요
  const navigate = useNavigate();
  const diarydate = ["2024-05-13", "2024-05-14", "2024-05-15"];
  const formattedDates = diarydate.map((dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    return formattedDate;
  });
  const handleClick = (index) => {
    navigate("/diarycontent", { state: diarydate[index] });
  };
  return (
    <div>
      {formattedDates.map((date, index) => (
        <div
          className="my-3 flex bg-[#e0f4ff] h-[5rem] items-center justify-between px-2"
          onClick={() => handleClick(index)}
        >
          <div
            key={index}
            className="pl-3 text-[#7a7a7a] text-xl bg-white w-[50%] h-12 flex items-center rounded-xl"
          >
            {date}
          </div>
          <div className="text-xl text-[#82aae3] font-bold">
            일기 확인하기 {">"}
          </div>
        </div>
      ))}
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
      <div className="flex items-center justify-evenly">
        <input
          className="text-xl"
          type="date"
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
          value={endDate}
          onChange={handleEndDateChange}
        />
        <div className="text-xl">까지</div>
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
      <DiaryListCop />
    </div>
  );
};

export default DiaryManagement;
