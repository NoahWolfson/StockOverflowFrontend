import React, { useEffect, useState } from "react";
import "./StockFinancial.css"

interface StockData {
    data?: any;
}
const StockFinancialComponent: React.FC<StockData> = ({data}) => {
    const [financialData, setFinancialData] = useState<any[]>([]);
    useEffect(() => {
        console.log(data)
        if (data) {
            const arrayData = Array.isArray(data) ? data : Object.values(data);
            setFinancialData(arrayData)
            console.log('inside the Finance');
            console.log(arrayData);
        }
    }, [data])
    if (!data) {
        return <p>Loading...</p>
    }
    function splitCamalCase(word: string): string {
        const word2: string = word.charAt(0).toUpperCase() + word.slice(1);
        const words: string[] = word2.split(/(?=[A-Z])/);
        console.log(words)
        let finalWord: string = "";
        words.forEach(w => {
            finalWord += `${w} `
        })
        return finalWord;
    }
    return (
        <div className="StockFinancialComponent">
            {Object.entries(data).map(([key, value]: [string, any], index: number) => {

                if (!value?.fmt) {
                    return null;
                }

                return (
                    <div key={index} className="data_container underline">
                        <p className="data_name data_text">{splitCamalCase(key)}</p> 
                        <p className="data data_text">{value.fmt}</p>
                    </div>
                );
            })}
        </div>
      );
}
export default StockFinancialComponent;