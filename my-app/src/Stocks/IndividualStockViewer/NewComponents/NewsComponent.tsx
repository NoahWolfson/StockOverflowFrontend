import React, { useEffect, useState } from "react";
import "./NewsComponent.css";

interface StockData {
    data?: any;
}

const NewsComponent: React.FC<StockData> = ({ data }) => {
    const [newsData, setNewsData] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            const arrayData = Array.isArray(data) ? data : Object.values(data);
            setNewsData(arrayData);
        }
    }, [data]);

    return (
        <div className="NewsComponent">
            {newsData
                .filter((_: any, index: number) => index < 16)
                .map((element: any, index: number) => (
                    <div
                        className={`newsBox ${index % 2 === 0 ? "even" : "odd"}`}
                        key={index}
                    >
                        <div className="news-content">
                            <a
                                href={
                                    element["content"]["clickThroughUrl"]
                                        ? element["content"]["clickThroughUrl"]["url"]
                                        : element["content"]["previewUrl"]
                                }
                                className="newsTitle"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {element["content"]["title"]}
                            </a>
                            <p className="author">
                                {element["content"]["provider"]["displayName"]}
                            </p>
                        </div>
                        {element["content"]["thumbnail"] && (
                            <div className="news-picture-container">
                                <img
                                    className="news-article-img"
                                    src={
                                        element["content"]["thumbnail"]["resolutions"][1]["url"]
                                    }
                                    alt="news-thumbnail"
                                />
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default NewsComponent;