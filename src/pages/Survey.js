import React, {useEffect, useState} from 'react';
import SurveyController from "../api/survey.controller";

function SurveyCop({question}) {
    return (
        <div className={"bg-[#e0f4ff] my-10 p-4 text-2xl rounded-3xl space-y-3 shadow-lg"}>
            <div className={"flex"}>
                <p>{question.index}. {question.question}</p>
            </div>
            <div className={"pl-4 w-full h-14 bg-white rounded-2xl mb-4 flex items-center"}>
                1. O
            </div>
            <div className={"pl-4 w-full h-14 bg-white rounded-2xl flex items-center"}>
                2. X
            </div>

        </div>
    );
}

function SurveyList({questionState, ...rest}) {
    return (
        <>
            {questionState.map((q, index) => {
                return (
                    <SurveyCop key={index} question={q}/>
                )
            })}
        </>
    );
}

function Survey({...rest}) {

    const [questionState, setQuestionState] = useState([]);

    const get_survey = async () => {
        const survey = await SurveyController.findAllSimpleSurvey();
        setQuestionState(survey.data.data);
    }

    useEffect(() => {
        get_survey();
    }, []);


    return (
        <div className={"px-4"}>
            <SurveyList questionState={questionState}/>
        </div>
    );
}

export default Survey;