import React from "react";
import './LoadingComponent.css'
const LoadingComponent = () => {
    return (
        <div className="loadingBody">
            <div className="LoadingPictureContainer">
                <img className="LoadingPic" src="/LoadingImg/loading.gif" alt="Loading"></img>
            </div>
        </div>
    )
}
export default LoadingComponent;