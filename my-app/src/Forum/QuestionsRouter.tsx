import React from "react";
import {Route, Routes} from "react-router-dom";
import {useAuth} from "../useAuth";
import IndividualQuestionComponent from "./IndividualQuestionPage/IndividualQuestionComponent";
const QuestionsRouter: React.FC = () => {
    const { setIsAuthenticated } = useAuth();
    return (
        <Routes>
            <Route path=":QuestionId" element={<IndividualQuestionComponent setAuth={setIsAuthenticated}/>} />
        </Routes>
    );
};

export default QuestionsRouter;