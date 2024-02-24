import React, {useEffect, useState} from 'react';
import SurveyController from "../api/survey.controller";
import "../App.css";

function SurveyCop({question}) {
    return (
        <div className={""}>
            <p className={""}>{question.index}</p>
            {question.question}
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
        <div className={""}>
            <SurveyList questionState={questionState}/>
        </div>
    );
}

export default Survey;