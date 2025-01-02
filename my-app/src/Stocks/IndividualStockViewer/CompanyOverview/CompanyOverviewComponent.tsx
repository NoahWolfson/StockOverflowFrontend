import React, { useEffect, useState } from "react";
import "./CompanyOverview.css"
import { StockData } from "../../../Interfaces/StockData";

/**
 * this component is responsible for showing the company information for a particular stock. 
 * @param data - the company information  data for the stock
 * @returns 
 */
const CompanyOverviewComponent: React.FC<StockData> = ({data}) => {
    
    if (!data) {
        return <p>Loading...</p>
    }
    return (
    <div className="CompanyOverviewComponent">
            <div className="company_buisness_summary_container">
                <p className="data_name data_text">Buisness Summary</p>
                <p className="data data_text">{data['body']['longBusinessSummary']}</p>
            </div>
            <div className="additional_comp_data">
                <div className="data_container">
                    <p className="data_name data_text">Headquaters</p>
                    <p className="data data_text">{data['body']['state'] + ", " + data['body']['country']}</p>
                </div>
                <div className="data_container">
                    <p className="data_name data_text">Website</p>
                    <p className="data data_text">{data['body']['website']}</p>
                </div>
                <div className="data_container">
                    <p className="data_name data_text">Industry</p>
                    <p className="data data_text">{data['body']['industry']}</p>
                </div>
                <div className="data_container">
                    <p className="data_name data_text">Sector</p>
                    <p className="data data_text">{data['body']['sector']}</p>
                </div>
                <div className="data_container">
                    <p className="data_name data_text">CEO</p>
                    <p className="data data_text">{data['body']['companyOfficers'][0]['name']}</p>
                </div>
                <div className="data_container">
                    <p className="data_name data_text">Employees</p>
                    <p className="data data_text">{data['body']['fullTimeEmployees']}</p>
                </div>
            </div>
        
    </div>
    )
}
export default CompanyOverviewComponent;