import React, {FormEvent, useEffect, useState} from "react";
import ResultsComponent from "./ResultsComponent/ResultsComponent";
import {SearchResultData} from "../MessageTypes";
import {AuthType} from "../../Interfaces/AuthType";
import ForumPageService from "../ForumPageService";
import LoadingComponent from "../../GeneralRoutes/LoadingPage/LoadingComponent";
import QuestionPoster from "./QuestionPoster/QuestionPoster";
import './QuestionSearcher.css'
import {isAuthenticated} from "../../Interfaces/IsAuthenticated";
const QuestionsSearcher: React.FC<isAuthenticated> = ({setIsAuthenticated})=>{
    const [messages,setMessages] = useState<SearchResultData[]>();
    const [sort, setSort] = useState<string>("Relevance");
    const [search,setSearch] = useState("");
    const searchMessages = async(e: FormEvent)=>{
        e.preventDefault();
        try{
            let response = await ForumPageService.getSearchResults(setIsAuthenticated, search,sort);
            setMessages(prevState => response);
        }catch (err){
            console.error(err)}
        }
    useEffect(()=>{
        const init =async ()=>{
            try {
                setMessages(await ForumPageService.getRecentQuestions(setIsAuthenticated));
            }
            catch(err){
                console.error("Failed to find recent messages: " + err);
            }
        }
        if(!messages) {
            init();
        }
    },[])
    return(
        <div className="QuestionSearcher">
            <label className="WarningLabel">Profane or empty messages are not allowed.</label>
            <QuestionPoster setAuth={setIsAuthenticated}></QuestionPoster>
                <form onSubmit={searchMessages}>
                    <label>
                        <input type={"text"} value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <select className="SortSelect" onChange={(e) => setSort(e.target.value)}>
                            <option value="Relevance">Sort by Text Similarity</option>
                            <option value="Date_Created">Sort by Date</option>
                            <option value="Likes">Sort by Likes</option>
                            <option value="Dislikes">Sort by Dislikes</option>
                        </select>
                    </label>
                    <button type={"submit"} className={"MessageSearchButton"}>See Results</button>
                </form>
            {messages ? (<ResultsComponent results={messages}/>) : <LoadingComponent/>}
        </div>
    );
}
export default QuestionsSearcher;