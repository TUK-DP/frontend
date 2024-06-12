import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";
import { useNavigate } from "react-router-dom";

function DiaryListCop({ id }) {
  //날짜리스트랑 리스트 길이 추가 필요
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="font-bold text-xl"
        onClick={() => navigate("/diarycontent")}
      >
        1. 날짜
      </div>
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
      <DiaryListCop id={userInfo.userId} />
    </div>
  );
};

export default DiaryManagement;
