import React, { useEffect, useState } from "react";
import GenrelRoutesAPIService from "../GenrelRoutesAPIService";
import { useAuth } from "../../useAuth";
import './HomeComponent.css'
/**
 * the home component is responsible for displaying the different types of features for the StockOverflow application to infomr the user what are wesbite does 
 * @returns 
 */
const HomeComponent: React.FC = () => {
    const { setIsAuthenticated } = useAuth(); 
    const [dbStatus, setdbStatus] = useState("");
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const response = await GenrelRoutesAPIService.getHomeData();
                let currUser: string = response.data.currUser;
                let currPic: string = response.data.profilePicture;
                setdbStatus(response.data.dbStatus);
                setIsAuthenticated({'accountId': currUser, picStr: currPic})
            } catch (error) {
                console.log("Failed to fetch home data:", error);
                setIsAuthenticated({'accountId': "", picStr:  ""})
            }
        };

        fetchHomeData();
    }, [setIsAuthenticated, setdbStatus]);
    return (
            <div className="HomeBody">
                <div className="dbStatut">
                    <p className="theStatus">Database Status: {JSON.stringify(dbStatus)}</p>
                </div>
                <div className="welcomeContainer">
                    <h1 className="welcomeTitle">Welcome to StockOverflow</h1>
                    <p className="welcomeDescription">At StockOverflow uses the forum and social media like structure of StackOverflow and applies it to primarily talk about stocks. Users will have the ability to discuss any problems or opinions on any stocks or market trends that they want to discuss. Like reddit, any topics regarding stocks that have more likes will be prioritized over any with fewer likes. In addition, if a user wants to learn more about a particular stock, they have the ability to search that stock up on our website and learn about the company's demographics, finances and any current breaking news. </p>
                </div>
                <div className="featureContainer">
                    <div className="featureTitleContainer">
                        <h3 className="featureTitle">Stocks</h3>
                    </div>
                    <div className="theFeature">
                        <div className="subFeatureContainer">
                            <div className="subFeatureSide pictureSide">
                                <img src="/HomeImages/StockSearcher.png" alt="FeaturePic" className="featurePic"></img>
                            </div>
                            <div className="subFeatureSide descriptionSide">
                                <h4 className="subFeatureTitle">Stock Searcher</h4>
                                <h6 className="subFeatureDescription">Search using the Stock Ticker or company name to find any stock your looking for! No Account Needed</h6>
                            </div>
                        </div>
                        <div className="subFeatureContainer">
                            <div className="subFeatureSide descriptionSide">
                                <h4 className="subFeatureTitle">Individual Stock Page</h4>
                                <h6 className="subFeatureDescription">Find information regarding the stock of your choice inlduding Stock News, Company Financials and Revenue, the stocks Real Time price and much more! No Account Needed</h6>
                            </div>
                            <div className="subFeatureSide pictureSide">
                                <img src="/HomeImages/IndividualStockPage.png" alt="FeaturePic" className="featurePic"></img>
                            </div>
                        </div>
                        <div className="subFeatureContainer">
                            <div className="subFeatureSide pictureSide">
                                <img src="/HomeImages/TrendingPage.png" alt="FeaturePic" className="featurePic"></img>
                            </div>
                            <div className="subFeatureSide descriptionSide">
                                <h4 className="subFeatureTitle">Trending Stock Page</h4>
                                <h6 className="subFeatureDescription">See what Stocks are overpreforming and underpreforming.  There are multiple categories such as the 52 Week High and Low which illistrates how these stocks are preforming based on its Price 
                                for the last year. The Percent Gainers, Percent Losers and Net Gainers show the best and worst preforming stocks on the last trading day </h6>
                            </div>
                        </div>
                    </div>  
                    </div>
                    <div className="featureContainer">
                        <div className="featureTitleContainer">
                            <h3 className="featureTitle">Public Forum</h3>
                        </div>
                        <div className="subFeatureContainer">
                            <div className="subFeatureSide pictureSide">
                                <img src="/Forum/QuestionSearcher.png" alt="FeaturePic" className="featurePic"></img>
                            </div>
                            <div className="subFeatureSide descriptionSide">
                                <h4 className="subFeatureTitle">Individual Questions Page</h4>
                                <h6 className="subFeatureDescription">Search for other user questions that match your inquiry. Also filter for the hottest and coldest, most recent and oldest questions using the Question Filter.</h6>
                            </div>
                        </div>
                        <div className="subFeatureContainer">
                            <div className="subFeatureSide descriptionSide">
                                <h4 className="subFeatureTitle">Reply To Other Users</h4>
                                <h6 className="subFeatureDescription">You think you know how to answer some stock questions, or maybe you want to comment on someone elses response? Make an account today to respond to any other user questions</h6>
                            </div>
                            <div className="subFeatureSide pictureSide">
                                <img src="/Forum/IndividualQuestionPage.png" alt="FeaturePic" className="featurePic"></img>
                            </div>
                        </div>
                        <div className="subFeatureContainer">
                            <div className="subFeatureSide pictureSide">
                                <img src="" alt="FeaturePic" className="featurePic"></img>
                            </div>
                            <div className="subFeatureSide descriptionSide">
                                <h4 className="subFeatureTitle">Like/ Dislike Questions and Respones</h4>
                                <h6 className="subFeatureDescription">Satisfied or Unsatisfied with a question or a user response? Sign up today to have teh ability to like or dislike user posts.</h6>
                            </div>
                    </div>
                </div>
                <div className="featureContainer">
                    <div className="featureTitleContainer">
                        <h3 className="featureTitle">Account</h3>
                    </div>
                    <div className="subFeatureContainer">
                        <div className="subFeatureSide pictureSide">
                            <img src="" alt="FeaturePic" className="featurePic"></img>
                        </div>
                        <div className="subFeatureSide descriptionSide">
                            <h4 className="subFeatureTitle">Customize Your Account</h4>
                            <h6 className="subFeatureDescription">Choose your own unique username, profile picture and birthday. Also add infomration about yourself in the profile description textbox. Go to the Eidt Profile Page under your account to start!</h6>
                        </div>
                    </div>
                    <div className="subFeatureContainer">
                        <div className="subFeatureSide descriptionSide">
                            <h4 className="subFeatureTitle">Follow Stocks</h4>
                            <h6 className="subFeatureDescription">Continue to suctomize your account by adding stocks to your profile page. Go to the Individual Stock Page and add stocks to your account now! Account needed to add stocks.</h6>
                        </div>
                        <div className="subFeatureSide pictureSide">
                            <img src="" alt="FeaturePic" className="featurePic"></img>
                        </div>
                    </div>
                    <div className="subFeatureContainer">
                        <div className="subFeatureSide pictureSide">
                            <img src="" alt="FeaturePic" className="featurePic"></img>
                        </div>
                        <div className="subFeatureSide descriptionSide">
                            <h4 className="subFeatureTitle">View Individual Account Public Forum Messages</h4>
                            <h6 className="subFeatureDescription">Want to look at past user messages? Go to any user account to view there queries, responses liked and displiked messages.</h6>
                        </div>
                    </div>
                    <div className="subFeatureContainer">
                        <div className="subFeatureSide descriptionSide">
                            <h4 className="subFeatureTitle">Notifications</h4>
                            <h6 className="subFeatureDescription">Want day to day stock news? Want to be notified about other users answering or responding to your query or response? Go to the Edit Profile Page and turn on notifications to start now!.</h6>
                        </div>
                        <div className="subFeatureSide pictureSide">
                            <img src="/HomeImages/Notifications.png" alt="FeaturePic" className="featurePic"></img>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default HomeComponent;