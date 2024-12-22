import React, { useEffect, useState } from "react"
import UserAPIService from "../UserAPIService";
import { useNavigate, useParams } from "react-router-dom";
import UserStockComponent from "./UserStockFollowed/UserStockFollowedComponent";
import './UserProfilePage.css'
import { AuthType } from "../../Interfaces/AuthType";

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
    const {userId} = useParams<AccountParam>();
    const [error, setError] = useState("");
    const navigator = useNavigate();
    const [userData, setUserData] = useState<any | null>(null);
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
            } catch (error) {
                setError("Error getting account data")
            }
        }
        UserDataGetter()
    }, [userId, setIsAuthenticated])

    const goToEditPage = () => {
        if (userData.currUser === userId) {
            navigator(`/user/${userId}/edit-profile`)
        }
    }
    if (!userData) {
        return <img src="/LoadingImg/loading.gif" alt='loading' className="loadingImg"></img>; 
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
                    <p>Nothing to see here</p>
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
