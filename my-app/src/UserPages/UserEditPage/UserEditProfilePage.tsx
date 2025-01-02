import React, { ReactHTMLElement, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import './UserEditProfile.css'
import UserAPIService from "../UserAPIService";
import LoadingComponent from "../../GeneralRoutes/LoadingPage/LoadingComponent";
import { isAuthenticated } from "../../Interfaces/IsAuthenticated";
import { AccountParam } from "../../Interfaces/AccountParam";

/**
 * this page is responsible for allowing the current user to edit hie account.
 * @param param0 
 * @returns 
 */
const UserEditProfilePage: React.FC<isAuthenticated> = ({setIsAuthenticated}) => {
    const [userData, setUserData] = useState<any | null>(null);
    const {accountId} = useParams<AccountParam>();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [profDesc, setProfDesc] = useState("");
    const [error, setError] = useState("");
    const [gotUserInfo, setGotUserInfo] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState<File | undefined> (undefined);
    const [RecieveMsgPublicForum, setRecieveMsgPublicForum] = useState(false);
    const [ReceiveMsgLiked, setReceiveMsgLiked] = useState(false);
    const [RecieveStockMsg, setRecieveStockMsg] = useState(false);
    const navigator = useNavigate()

    const submitUserEditPage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        try {
            if (!birthday || isNaN(new Date(birthday).getTime())) {
                alert("Please provide a birthday.");
                return;
            }
            let currBirthdate: Date = new Date(birthday)
            console.log(selectedPicture)
            console.log('one of the fields')
            console.log(RecieveStockMsg)
            const response = await UserAPIService.postUserEditProfilePage(username, email, currBirthdate, profDesc, RecieveMsgPublicForum, ReceiveMsgLiked, RecieveStockMsg, accountId, selectedPicture);
            console.log(response);
            navigator(`/user/${accountId}/profile`)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelButton =  () => {
        navigator(`/user/${accountId}/profile`);
    }

    useEffect(()=> {
        const getUserProfliePage = async () => {
            try {
                const response = await UserAPIService.getUserEditProfilePage(accountId);
                 //will go to 404 route if there was a 404 error
                 if (response?.status === 404) {
                    navigator('/404')
                } else if (response?.status !== 200) {
                    setError(response?.msg);
                }
                console.log(response)
                setGotUserInfo(true);
                console.log('is running')
                setUserData(response.data.currAccount)
                let currUser: string = response.data.currUser;
                let currPic: string = response.data.profilePicture;
                setIsAuthenticated({'accountId': currUser, picStr:  currPic})
                setUsername(response.data.currAccount.Username);
                setEmail(response.data.currAccount.Email);
                setSelectedPicture(response.data.currAccount.ProfileImage)
                setBirthday(response.data.currAccount.Birthday);
                setProfDesc(response.data.currAccount.ProfileDesc);
                setRecieveMsgPublicForum(response.data.currAccount.RecieveResponseNotifications ? true : false);
                setReceiveMsgLiked(response.data.currAccount.RecieveLikedNotifications ? true : false);
                setRecieveStockMsg(response.data.currAccount.RecieveStockNewsNotifications ? true : false);
            }
            catch (error) {
                console.log(error)
            } 
        }
        if (!gotUserInfo) {
            getUserProfliePage()
        }
    }, [accountId, setIsAuthenticated, setGotUserInfo, gotUserInfo, navigator])
    if (!userData) {
        return <LoadingComponent/>
    }
    console.log(userData)
    /**
     * @param event this method is responsible for handiling any file changes that the user with the account did
     */
    function handlePictureChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.files && event.target.files.length > 0) {
            console.log(event.target.files)
            setSelectedPicture(event.target.files[0])
        }
    }

    return (
        <div className="EditProfileBody">
            <h3>Edit User Profile</h3>
            <form className="theForm" onSubmit={submitUserEditPage}>
                <div className="data">
                    <label className="label">Username</label>
                    <input className='data-field' value={username} onChange={(e) => setUsername(e.target.value)}  type="text"></input>
                </div>
                <div className="data">
                    <label className="label">Email</label>
                    <input className='data-field' value={email}  onChange={(e) => setEmail(e.target.value)} type="email"></input>
                </div>
                <div className="Birthday">
                    <label className="label">Birthday</label>
                    <input  className='data-field' value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date"></input>
                </div>
                <div className="data">
                    <label className="label">Profile Description</label>
                    <textarea className='description' value={profDesc}  onChange={(e) => setProfDesc(e.target.value)} ></textarea>
                </div>
                <div className="data">
                    <label className="label">Profile Picture</label>
                    <input type="file" accept="image/*" onChange={handlePictureChange}></input>
                </div>
                <div className="data">
                    <label className="label">Recieve Notifications For Public Forum Responses</label>
                    <label> <input type="radio" value='Yes' name='public-forum-responses' checked={RecieveMsgPublicForum} onChange={() => setRecieveMsgPublicForum(true)}></input>Yes</label>
                    <label><input type="radio" value='No' name='public-forum-responses' checked={!RecieveMsgPublicForum} onChange={() => setRecieveMsgPublicForum(false)}></input>No</label>
                </div>
                <div className="data">
                    <label className="label">Recieve Notifications For Public Forum Liked Messages</label>
                    <label><input type="radio" value='Yes' name='public-forum-likes' checked={ReceiveMsgLiked} onChange={() => setReceiveMsgLiked(true)}></input>Yes</label>
                    <label> <input type="radio" value='No' name='public-forum-likes' checked={!ReceiveMsgLiked} onChange={() => setReceiveMsgLiked(false)}></input>No</label>
                </div>
                <div className="data">
                    <label className="label">Recieve Notifications For Stock News</label>
                    <label><input type="radio" value='Yes' name='public-forum-news' checked={RecieveStockMsg} onChange={() => setRecieveStockMsg(true)}></input>Yes</label>
                    <label><input type="radio" value='No' name='public-forum-news' checked={!RecieveStockMsg} onChange={() => setRecieveStockMsg(false)}></input>No</label>
                </div>
                <div className="submit-container">
                    <button className='btn' type="submit">Submit</button>
                    <button className="btn cancel" onClick={cancelButton}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default UserEditProfilePage;