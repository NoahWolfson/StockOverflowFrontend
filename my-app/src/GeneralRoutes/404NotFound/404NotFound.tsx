import React from "react";
import './404NotFound.css'
import { useNavigate } from "react-router-dom";

const NotFoundComponent = () => {
    const navigator = useNavigate();

    const goHome = () => {
        navigator('/')
    }

    return (
        <div className="notFoundBody">
            <div className="notFoundTitleContainer">
                <h1 className="theNotFoundTitle">
                    404
                </h1>
                <h3 className="theNotFoundTitle">
                    Cannot Find What Your Looking For
                </h3>
            </div>
            <div className="notFoundPictureContainer">
                <img className="notFoundPicture" src="/404NotFound/404.png" alt="404"></img>
            </div>
            <button onClick={goHome} className="btn">Go Home</button>
        </div>
    )
}
export default NotFoundComponent;