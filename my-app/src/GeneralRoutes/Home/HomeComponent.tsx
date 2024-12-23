import React, { useEffect, useState } from "react";
import GenrelRoutesAPIService from "../GenrelRoutesAPIService";
import { useAuth } from "../../useAuth";

const HomeComponent: React.FC = () => {
    const { setIsAuthenticated } = useAuth(); 
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                console.log('before')
                const response = await GenrelRoutesAPIService.getHomeData();
                console.log(response)
                console.log(response)
                let currUser: string = response.data.currUser;
                let currPic: string = response.data.profilePicture;
                setIsAuthenticated({'accountId': currUser, picStr: currPic})
            } catch (error) {
                console.log("Failed to fetch home data:", error);
                setIsAuthenticated({'accountId': "", picStr:  ""})
            }
        };

        fetchHomeData();
    }, [setIsAuthenticated]);
    return (
        
            <body className="HomeBody">
                <div className="featureContainer">
                    <div className="featureTitleContainer">
                        <h3 className="featureTitle">Stocks</h3>
                    </div>
                    <div className="subFeatureContainer">
                        <div className="subFeatureSide pictureSide">
                            <img src="" alt="FeaturePic" className="featurePic"></img>
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
                            <img src="" alt="FeaturePic" className="featurePic"></img>
                        </div>
                    </div>
                    <div className="subFeatureContainer">
                        <div className="subFeatureSide pictureSide">
                            <img src="" alt="FeaturePic" className="featurePic"></img>
                        </div>
                        <div className="subFeatureSide descriptionSide">
                            <h4 className="subFeatureTitle">Trending Stock Page</h4>
                            <h6 className="subFeatureDescription">See what Stocks are overpreforming and underpreforming.  There are multiple categories such as the 52 Week High and Low which illistrates how these stocks are preforming based on its Price 
                            for the last year. The Percent Gainers, Percent Losers and Net Gainers show the best and worst preforming stocks on the last trading day </h6>
                        </div>
                    </div>
                </div>
                <div className="featureContainer">
                    <div className="featureTitleContainer">
                        <h3 className="featureTitle">Public Forum</h3>
                    </div>
                    <div className="subFeatureContainer">
                        <div className="subFeatureSide pictureSide">
                            <img src="" alt="FeaturePic" className="featurePic"></img>
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
                            <img src="" alt="FeaturePic" className="featurePic"></img>
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
                            <img src="" alt="FeaturePic" className="featurePic"></img>
                        </div>
                    </div>
                </div>
            </body>

        
    )
}
export default HomeComponent;