import React, { useEffect, useState } from "react";
import "./NewsComponent.css"

interface StockData {
    data?: any;
}
const NewsComponent: React.FC<StockData> = ({data}) => {
    const [newsData, setNewsData] = useState<any[]>([]);
    useEffect(() => {
        console.log(data)
        if (data) {
            const arrayData = Array.isArray(data) ? data : Object.values(data);
            setNewsData(arrayData)
        }
    }, [data])
    return (
    <div className="NewsComponent">
        {newsData.filter((_: any, index: number) => index < 16).map((element : any, index: number) => (
                <div className={"newsBox " + (index % 2 === 0 ? "even" : "Odd")} id={index.toString()}>
                    <div className="title_and_author">
                        <a href={element["content"]["clickThroughUrl"] ? element["content"]["clickThroughUrl"]["url"] : element["content"]["previewUrl"]} className="title news_text">
                            {element["content"]["title"]}
                        </a>
                        <p className="author news_text">
                            {element["content"]["provider"]["displayName"]}
                        </p>
                    </div>
                    <div className="picture_container">
                        <img className='article_img' src={element["content"]["thumbnail"]? element["content"]["thumbnail"]["resolutions"][1]["url"] : ""} alt="img"/>
                    </div>
                </div>
        ))}
    </div>
    )
}
export default NewsComponent;