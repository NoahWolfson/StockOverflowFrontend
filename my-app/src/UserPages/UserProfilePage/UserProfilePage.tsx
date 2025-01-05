import React, {FormEvent, useEffect, useState} from "react"
import UserAPIService from "../UserAPIService";
import { useNavigate, useParams } from "react-router-dom";
import UserStockComponent from "./UserStockFollowed/UserStockFollowedComponent";
import './UserProfilePage.css'
import { AuthType } from "../../Interfaces/AuthType";
import MessageComponent from "../../Forum/IndividualQuestionPage/MessageComponent/MessageComponent";
import UserMessagesComponent from "./UserMessages/UserMessagesComponent";
import messageStubData from "./UserMessages/UserMessageTypes";
import LoadingComponent from "../../GeneralRoutes/LoadingPage/LoadingComponent";

type isAuthenticated = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<AuthType>>;
} 
type AccountParam = {
    userId?: string
}
/**
 * this component displays the Account data based on the spefici user selected. It includes information about 
 * the user like birthday, description, username and sign up date. 
 * @param param0 
 * @returns 
 */
const UserProfilePage: React.FC<isAuthenticated> = ({setIsAuthenticated}) => {
    const [search,setSearch] = useState("");
    const {userId} = useParams<AccountParam>();
    const [error, setError] = useState("");
    const navigator = useNavigate();
    const [userData, setUserData] = useState<any | null>(null);
    const [messages,setMessages] = useState<messageStubData[] | null>(null);
    const [sort, setSort] = useState<string>("Relevance");
    useEffect(() => {
        /**
         * this method is reponsible for getting the account information from teh backend 
         */
        const UserDataGetter = async () => {
            try {
                console.log(userId)
                const response = await UserAPIService.getUserData(userId)
                console.log(response)
                //will go to 404 route if there was a 404 error
                if (response?.status === 404) {
                    navigator('/404')
                } else if (response?.status !== 200) {
                    setError(response?.msg);
                }
                setUserData(response.data)
                let currUser: string = response.data.currUser;
                let currPic: string = response.data.profilePicture;
                setIsAuthenticated({'accountId': currUser, picStr:  currPic})
                console.log('userdata');
                console.log(userData)
                const messageResponse = await UserAPIService.getUserMessages(userId);
                currUser = response.currUser;
                currPic = response.profilePicture;
                console.log(messageResponse);
                setMessages(prev=>messageResponse.messages);

            } catch (error) {
                setError("Error getting account data")
            }
        }
        UserDataGetter()
    }, [userId, setIsAuthenticated])
    const searchMessages = async(e: FormEvent)=>{
        e.preventDefault();
        if(userId){
        try{
            let response = await UserAPIService.getUserMessageSearch(userId,search,sort);
            setMessages(prevState => response.matches);
        }catch (err){
            console.error(err)}
        }
    }
    const goToEditPage = () => {
        if (userData.currUser === userId) {
            navigator(`/user/${userId}/edit-profile`)
        }
    }
    if (!userData) {
        return <LoadingComponent/>
    }
    if (error !== "") {
        return <div className="error">{error}</div>;
    }
    return (
        <div className="ProfilePageBody">
            <div className="profile-head">
                <div className="profile-banner">
                    <div className="account-details">
                        
                        <div className="account-image">
                            <img src={userData.profilePicture ? userData.profilePicture :  "/profile-default-img.png"} alt="profile-pic" />
                            <p className="username">{userData.currViewedUser.Username}</p>
                        </div>
                    </div>
                    {userData.currUser === userId ? <button onClick={() => {goToEditPage()}}className="edit-profile-btn">Edit Profile</button> : ""}
                </div>
            </div>
            <div className="profile-body">
                <div className="profile-messages">
                    <form onSubmit={searchMessages}>
                        <label>
                            <input type={"text"} value={search} onChange={(e) => setSearch(e.target.value)} />
                            <select className="SortSelect" onChange={(e) => setSort(e.target.value)}>
                                <option value="Relevance">Sort by Text Similarity</option>
                                <option value="Date_Created">Sort by Date</option>
                                <option value="Likes">Sort by Likes</option>
                                <option value="Dislikes">Sort by Dislikes</option>
                            </select>
                        </label>
                        <button type={"submit"} className={"MessageSearchButton"}>See Results</button>
                    </form>
                    {(messages && userId)? (<UserMessagesComponent messages= {messages} accountId={userId} key={"userMessages"}></UserMessagesComponent>): null}
                </div>
                <div className="about-and-stocks">
                    <div className="profile-about">
                        <div className="account-data-container">
                            <p className="account-data">Sign Up Date</p>
                            <p className="account-data">{userData.currViewedUser.Signup}</p>
                        </div>
                        <div className="account-data-container">
                            <p className="account-data">Birthday</p>
                            <p className="account-data">{userData.currViewedUser.Birthday || "Nothing to see here"}</p>
                        </div>
                        <div className="account-data-container">
                            <p className="account-data">Profile Description</p>
                            <p className="account-data">{userData.currViewedUser.ProfileDesc || "Nothing to see here"}</p>
                        </div>
                    </div>
                    <div className="profile-stocks-followed">
                        <UserStockComponent stockData={userData.userStocks} accountId={userData.currUser}   />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserProfilePage;
