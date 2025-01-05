import React from "react";
import {Route, Routes} from "react-router-dom";
import {useAuth} from "../useAuth";
import IndividualQuestionComponent from "./IndividualQuestionPage/IndividualQuestionComponent";
import QuestionsSearcher from "./QuestionSearcher/QuestionsSearcher";
import NotFoundComponent from "../GeneralRoutes/404NotFound/404NotFound";
const QuestionsRouter: React.FC = () => {
    const { setIsAuthenticated } = useAuth();
    return (
        <Routes>
            <Route path = "" element = {<QuestionsSearcher setAuth={setIsAuthenticated}/>} />
            <Route path=":QuestionId" element={<IndividualQuestionComponent setAuth={setIsAuthenticated}/>} />
            <Route path = "*" element ={<NotFoundComponent/>}/>
        </Routes>
    );
};

export default QuestionsRouter;