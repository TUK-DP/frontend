import React, { useEffect, useState } from 'react';
import SurveyController from "../api/survey.controller";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

function SurveyCop({ question, onVote }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleVote = (option) => {
        setSelectedOption(option);
        onVote(question.index, option); // question의 id, 선택된 option을 전달
    };

    return (
        <div className={"bg-[#e0f4ff] my-10 p-4 text-2xl rounded-3xl space-y-3 shadow-lg"}>
            <div className={"flex"}>
                <p>{question.index}. {question.question}</p>
            </div>
            <div
                className={"pl-4 w-full h-14 bg-white rounded-2xl mb-4 flex items-center"}
                style={{ backgroundColor: selectedOption === 'O' ? '#C6F6D5' : 'white' }}
                onClick={() => handleVote('O')}
            >
                1. O
            </div>
            <div
                className={"pl-4 w-full h-14 bg-white rounded-2xl flex items-center"}
                style={{ backgroundColor: selectedOption === 'X' ? '#C6F6D5' : 'white' }}
                onClick={() => handleVote('X')}
            >
                2. X
            </div>
        </div>
    );
}

function SurveyList({ questionState, onVote }) {
    return (
        <>
            {questionState.map((q, index) => {
                return (
                    <SurveyCop key={index} question={q} onVote={onVote} />
                )
            })}
        </>
    );
}

function Survey() {
    const navigate = useNavigate();
    const [questionState, setQuestionState] = useState([]);

    const get_survey = async () => {
        const survey = await SurveyController.findAllSimpleSurvey();
        setQuestionState(survey.data.data);
    }

    useEffect(() => {
        get_survey();
    }, []);

    const handleVote = (questionIndex, option) => {
        // 투표 처리 로직 추가 필요
        console.log(`Question ID: ${questionIndex}, Selected Option: ${option}`);
    };

    const handleSubmit = () => {
      navigate("/surveyresult");
    };

    return (
        <div className={"px-4 mb-10"}>
            <SurveyList questionState={questionState} onVote={handleVote} />
            <Button height={"60px"} text={"제출하기"} fontSize={"24px"} onClick={handleSubmit} />
        </div>
    );
}

export default Survey;
