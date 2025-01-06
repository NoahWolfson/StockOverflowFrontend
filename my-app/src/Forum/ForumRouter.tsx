import React from "react";
import {Route, Routes} from "react-router-dom";
import {useAuth} from "../useAuth";
import IndividualQuestionComponent from "./IndividualQuestionPage/IndividualQuestionComponent";
import QuestionsSearcher from "./QuestionSearcher/QuestionsSearcher";
import NotFoundComponent from "../GeneralRoutes/404NotFound/404NotFound";
const ForumRouter: React.FC = () => {
    const { setIsAuthenticated } = useAuth();
    return (
        <Routes>
            <Route path = "" element = {<QuestionsSearcher setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path=":QuestionId" element={<IndividualQuestionComponent setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path = "*" element ={<NotFoundComponent/>}/>
        </Routes>
    );
};

export default ForumRouter;