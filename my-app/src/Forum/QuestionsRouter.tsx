import React from "react";
import {Route, Routes} from "react-router-dom";
import IndividualQuestionComponent from "./IndividualQuestionPage/IndividualQuestionComponent";
const QuestionsRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="questions/:QuestionId" element={<IndividualQuestionComponent />} />
        </Routes>
    );
};

export default QuestionsRouter;