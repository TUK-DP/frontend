import React, { useEffect, useState } from "react";
import SurveyController from "../api/survey.controller";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PAGENAME } from "../redux/modules/PageName";
import SkeletonSurvey from "../component/SkeletonSurvey";
import { FaRegCircle, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Button from "../component/Button";
import recordController from "../api/record.controller";
import { useSelector } from "react-redux";

function SurveyCop({ question, selectedResults, setSelectedResults, handleNextQuestion, handlePreviousQuestion }) {
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
      <div className="text-4xl w-full flex justify-between items-center font-bold h-[7rem] pt-3">
        {question.index === 1 ? (
          <FaChevronLeft size={"50px"} style={{ visibility: "hidden" }}/>
        ) : (
          <FaChevronLeft  onClick={handlePreviousQuestion} size={"50px"}/>
        )}
          {question.index} 번
          {question.index === 32 ? (
          <FaChevronRight size={"50px"} style={{ visibility: "hidden" }}/>
        ) : (
          <FaChevronRight onClick={handleNextQuestion} size={"50px"}/>
        )}
      </div>
      <div className={"flex flex-col bg-[#e0f4ff] mt-8 mb-14 p-6 text-3xl rounded-3xl shadow-lg break-keep"}>
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

function SurveyList({ questionState, currentQuestionIndex, selectedResults, setSelectedResults, handleNextQuestion, handlePreviousQuestion }) {
  return (
    <SurveyCop
      key={currentQuestionIndex}
      question={questionState[currentQuestionIndex]}
      selectedResults={selectedResults}
      setSelectedResults={setSelectedResults}
      handleNextQuestion={handleNextQuestion}
      handlePreviousQuestion={handlePreviousQuestion}
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
  const userId = useSelector((state) => state.UserInfo.userId);
  const [record, setRecord] = useState({});

  const get_survey = async () => {
    const survey = await SurveyController.findAllSimpleSurvey();
    setQuestionState(survey.data.data);
    setSelectedResults(new Array(survey.data.data.length).fill(null));
    setIsLoading(false);
  };

  useEffect(() => {
    getRecord();
    setTimeout(() => {
      get_survey();
    }, 1000);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionState.length - 1) {
      setCheckList(false);
      if(selectedResults[questionState[currentQuestionIndex].index]=="O"||selectedResults[questionState[currentQuestionIndex].index]=="X"){
        setCheckList(true);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const oCount = selectedResults.filter((result) => result === "O").length;
    const xCount = selectedResults.filter((result) => result === "X").length;
    console.log(`Total O Count: ${oCount}`);
    console.log(`Total X Count: ${xCount}`);  
    if (oCount + xCount === 32) {
      await getRecord(userId);
      if(record==null){
        setRecord(0);
      }
      saveRecord(userId, 32, oCount);
      navigate("/surveyresult", { state: { oCount, xCount, record } });
    }
  };  

  const saveRecord = async (id, totalSize, yCount) => {
    const recordData = {
      userId: id,
      totalQuestionSize: totalSize,
      yesCount: yCount
    };
    await recordController.saveRecord(recordData);
    console.log("save");
  };  

  const getRecord = async () => {
    try {
      const response = await recordController.prevRecord({ userId });
      const { isSuccess, message, result } = response.data;
      setRecord(result.yesCount);
    } catch (error) {
      console.log("이전 진단결과 조회 중 오류", error);
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
            selectedResults={selectedResults}
            setSelectedResults={setSelectedResults}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
          />
          {selectedResults[questionState[currentQuestionIndex].index]==null && !checkList ? (
            <div className="text-[#e15449] mt-2 text-xl mb-5 flex justify-center items-center">
              문항을 체크해주세요.
            </div>
          ) : <div className="mt-2 text-xl mb-5 invisible">빈칸</div>}
          {currentQuestionIndex===31?(
            <Button onClick={handleSubmit} height={"60px"} text={"제출하기"} fontSize={"24px"}/>
          ):(
            <div></div>
          )}
        </>
      )}
    </div>
  );
}

export default Survey;