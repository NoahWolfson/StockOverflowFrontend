import React from "react";

const LoadingComponent = () => {
    return (
        <div className="loadingBody">
            <div className="LoadingTitle">
                <h1 className="theLoadingTitle">
                    Loading...
                </h1>
            </div>
            <div className="LoadingPictureContainer">
                <img className="LoadingPic" src="./LoadingImg/loading.gif" alt="Loading"></img>
            </div>
        </div>
    )
}
export default LoadingComponent;