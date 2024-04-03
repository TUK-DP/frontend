import React from "react";
import "../index.css";
import mainBtn1 from "../assets/mainBtn1.png";
import mainBtn2 from "../assets/mainBtn2.png";
import mainBtn3 from "../assets/mainBtn3.png";
import mainBtn4 from "../assets/mainBtn4.png";
import mainBtn5 from "../assets/mainBtn5.png";
import user from "../assets/user.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="w-[22em] h-[11rem] bg-[#e0f4ff] mx-auto mt-[2rem] rounded-3xl flex justify-evenly flex-col"
        style={{ boxShadow: "3px 3px 3px rgb(200, 200, 200)" }}
      >
        <span className="text-2xl font-bold text-[#838383] mx-auto">
          치매진단 기록이 없습니다
        </span>
        <div className="w-[95%] flex justify-end">
          <div
            className="bg-[#82aae3] text-white w-[14rem] h-10 rounded-lg flex justify-center items-center font-bold text-lg"
            onClick={() => {
              navigate("/surveyStart");
            }}
          >
            치매진단 하러 가기
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-evenly">
          <div
            className="w-[10rem] h-[10rem] rounded-xl"
            style={{ boxShadow: "3px 3px 3px rgb(200, 200, 200)" }}
            onClick={() => {
              navigate("/gymnastics");
            }}
          >
            <div className="h-[75%] w-full flex flex-col justify-center items-center rounded-tl-xl rounded-tr-xl border-l-4 border-r-4 border-t-4">
              <img className="w-[7rem]" src={mainBtn1}></img>
            </div>
            <div className="h-[25%] w-full bg-[#82aae3] text-white flex justify-center items-center text-2xl font-bold rounded-bl-xl rounded-br-xl border-b-4 border-r-4 border-l-4">
              체조
            </div>
          </div>
          <div
            className="w-[10rem] h-[10rem] rounded-xl"
            style={{ boxShadow: "3px 3px 3px rgb(200, 200, 200)" }}
            onClick={() => {
              navigate("/games");
            }}
          >
            <div className="h-[75%] w-full flex flex-col justify-center items-center rounded-tl-xl rounded-tr-xl border-l-4 border-r-4 border-t-4">
              <img className="w-[7rem]" src={mainBtn2}></img>
            </div>
            <div className="h-[25%] w-full bg-[#82aae3] text-white flex justify-center items-center text-2xl font-bold rounded-bl-xl rounded-br-xl border-b-4 border-r-4 border-l-4">
              게임
            </div>
          </div>
        </div>

        <div className="flex mt-8 justify-evenly">
          <div
            className="w-[10rem] h-[10rem] rounded-xl"
            style={{ boxShadow: "3px 3px 3px rgb(200, 200, 200)" }}
            onClick={() => {
              navigate("/calendar");
            }}
          >
            <div className="h-[75%] w-full flex flex-col justify-center items-center rounded-tl-xl rounded-tr-xl border-l-4 border-r-4 border-t-4">
              <img className="w-[7rem]" src={mainBtn3}></img>
            </div>
            <div className="h-[25%] w-full bg-[#82aae3] text-white flex justify-center items-center text-2xl font-bold rounded-bl-xl rounded-br-xl border-b-4 border-r-4 border-l-4">
              일기
            </div>
          </div>
          <div
            className="w-[10rem] h-[10rem] rounded-xl"
            style={{ boxShadow: "3px 3px 3px rgb(200, 200, 200)" }}
          >
            <div
              className="h-[75%] w-full flex flex-col justify-center items-center rounded-tl-xl rounded-tr-xl border-l-4 border-r-4 border-t-4"
              onClick={() => {
                navigate("/surveyStart");
              }}
            >
              <img className="w-[7rem]" src={mainBtn4}></img>
            </div>
            <div className="h-[25%] w-full bg-[#82aae3] text-white flex justify-center items-center text-2xl font-bold rounded-bl-xl rounded-br-xl border-b-4 border-r-4 border-l-4">
              진단
            </div>
          </div>
        </div>

        <div className="flex mt-8 justify-evenly mb-[2rem]">
          <div
            className="w-[10rem] h-[10rem] rounded-xl"
            style={{ boxShadow: "3px 3px 3px rgb(200, 200, 200)" }}
          >
            <div className="h-[75%] w-full flex flex-col justify-center items-center rounded-tl-xl rounded-tr-xl border-l-4 border-r-4 border-t-4">
              <img className="w-[7rem]" src={mainBtn5}></img>
            </div>
            <div className="h-[25%] w-full bg-[#82aae3] text-white flex justify-center items-center text-2xl font-bold rounded-bl-xl rounded-br-xl border-b-4 border-r-4 border-l-4">
              치매센터
            </div>
          </div>
          <div
            className="w-[10rem] h-[10rem] rounded-xl"
            style={{ boxShadow: "3px 3px 3px rgb(200, 200, 200)" }}
            onClick={() => navigate("/login")}
          >
            <div className="h-[75%] w-full flex flex-col justify-center items-center rounded-tl-xl rounded-tr-xl border-l-4 border-r-4 border-t-4">
              <img className="w-[5rem]" src={user}></img>
            </div>
            <div className="h-[25%] w-full bg-[#82aae3] text-white flex justify-center items-center text-2xl font-bold rounded-bl-xl rounded-br-xl border-b-4 border-r-4 border-l-4">
              마이페이지
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
