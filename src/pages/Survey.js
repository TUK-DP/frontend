import React, { useEffect, useState } from "react";
import SurveyController from "../api/survey.controller";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";
import SkeletonSurvey from "../component/SkeletonSurvey";
import { FaRegCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import Button from "../component/Button";

function SurveyCop({ question, selectedResults, setSelectedResults }) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedResults[question.index] !== null) {
      setSelectedOption(selectedResults[question.index]);
    }
  }, [selectedResults, question.index]);

  const handleVote = (questionIndex, option) => {
    const updatedResults = [...selectedResults];
    updatedResults[questionIndex] = option;
    setSelectedResults(updatedResults);
  };

  return (
    <div>
      <div className="text-4xl w-full flex justify-center items-center mt-6 font-bold">
      {question.index} 번
      </div>
      <div className={"flex flex-col bg-[#e0f4ff] mt-8 mb-10 p-6 text-3xl rounded-3xl shadow-lg break-keep"}>
        <p>
          {question.question}
        </p>
      </div>
      <div className="flex w-full justify-between">
        <div
          className={
            "w-[45%] h-[12rem] bg-white flex items-center text-2xl rounded-3xl border-4 justify-center mb-5"
          }
          style={{
            backgroundColor: selectedOption === "O" ? "#C6F6D5" : "white",
          }}
          onClick={() => handleVote(question.index, "O")}
        >
          <FaRegCircle size={"80px"} />
        </div>
        <div
          className={"w-[45%] h-[12rem] bg-white flex items-center text-2xl rounded-3xl border-4 justify-center mb-5"}
          style={{
            backgroundColor: selectedOption === "X" ? "#C6F6D5" : "white",
          }}
          onClick={() => handleVote(question.index, "X")}
        >
          <RxCross2 size={"100px"} />
        </div>
      </div>
    </div>
  );
}

function SurveyList({ questionState, currentQuestionIndex, onVote, selectedResults, setSelectedResults }) {
  return (
    <SurveyCop
      key={currentQuestionIndex}
      question={questionState[currentQuestionIndex]}
      onVote={onVote}
      selectedResults={selectedResults}
      setSelectedResults={setSelectedResults}
    />
  );
}


function Survey() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_PAGENAME, pageName: "치매진단" });
  }, []);

  const navigate = useNavigate();
  const [questionState, setQuestionState] = useState([]);
  const [selectedResults, setSelectedResults] = useState(Array(32).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checkList, setCheckList] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const get_survey = async () => {
    const survey = await SurveyController.findAllSimpleSurvey();
    setQuestionState(survey.data.data);
    setSelectedResults(new Array(survey.data.data.length).fill(null));
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      get_survey();
    }, 1000);
  }, []);

  const handleVote = (questionIndex, option) => {
    console.log(`Question ID: ${questionIndex}, Selected Option: ${option}`);

    const updatedResults = [...selectedResults];
    updatedResults[questionIndex] = option;
    setSelectedResults(updatedResults);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionState.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const oCount = selectedResults.filter((result) => result === "O").length;
    const xCount = selectedResults.filter((result) => result === "X").length;
    console.log(`Total O Count: ${oCount}`);
    console.log(`Total X Count: ${xCount}`);
    if (oCount + xCount === 32) {
      navigate("/surveyresult", { state: { oCount, xCount } });
    }
  };

  return (
    <div className={"px-4 mb-10"}>
      {isLoading ? (
        <SkeletonSurvey />
      ) : (
        <>
          <SurveyList
            questionState={questionState}
            currentQuestionIndex={currentQuestionIndex}
            onVote={handleVote}
            selectedResults={selectedResults}
            setSelectedResults={setSelectedResults}
          />
          <div className={"flex w-full justify-between px-8 mb-[2rem]"}>
            {currentQuestionIndex === 0 ? (
              <div></div>
            ) : (
              <FaChevronLeft  onClick={handlePreviousQuestion} size={"50px"}/>
            )}
            {currentQuestionIndex === 31 ? (
              <div></div>
            ) : (
              <FaChevronRight onClick={handleNextQuestion} size={"50px"}/>
            )}
          </div>
          {!checkList ? (
            <div className="text-[#e15449] mt-2 text-xl">
              문항을 체크해주세요.
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Survey;