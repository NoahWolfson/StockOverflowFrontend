import React from "react";

const NotFoundComponent = () => {

    return (
        <div className="notFoundBody">
            <div className="notFoundTitle">
                <h1 className="theNotFoundTitle">
                    404
                </h1>
                <h3 className="theNotFoundTitle">
                    Cannot Find What Your Looking For
                </h3>
            </div>
            <div className="notFoundPicture">
                <img src="/404NotFound/404.png" alt="404"></img>
            </div>
        </div>
    )
}
export default NotFoundComponent;