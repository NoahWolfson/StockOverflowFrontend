import React from "react";
import {Route, Routes} from "react-router-dom";
import {useAuth} from "../useAuth";
import IndividualQuestionComponent from "./IndividualQuestionPage/IndividualQuestionComponent";
const QuestionsRouter: React.FC = () => {
    const { setIsAuthenticated } = useAuth();
    return (
        <Routes>
            <Route path="questions/:QuestionId" element={<IndividualQuestionComponent setIsAuthenticated={setIsAuthenticated}/>} />
        </Routes>
    );
};

export default QuestionsRouter;