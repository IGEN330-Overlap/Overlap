import React from 'react';
import './GroupName.css';

const axios = require("axios");

// display group name on group profile page
const GroupName = ({groupCode, groupName, createdDate}) => {
    //convert ISO date to long date
    let createdDay = createdDate.substr(8,2)
    let createdMonth;
    let createdYear = createdDate.substr(0,4)

    switch (createdDate.substr(5,2)) {
        case "01":
            createdMonth = "January";
            break;
        case "02":
            createdMonth = "February";
            break
        case "03":
            createdMonth = "March";
            break;
        case "04":
            createdMonth = "April";
            break;
        case "05":
            createdMonth = "May";
            break
        case "06":
            createdMonth = "June";
            break;
        case "07":
            createdMonth = "July";
            break;
        case "08":
            createdMonth = "August";
            break
        case "09":
            createdMonth = "September";
            break;
        case "10":
            createdMonth = "October";
            break;
        case "11":
            createdMonth = "November";
            break;
        case "12":
            createdMonth = "December";
            break;
        default:
            console.log("Oops! Can't find date.")
    }
    
    const editGroupName = () => {
        
    }

    return(
    <div className="group-name-container">
        <div className="group-name-edit">
        <h1 className="text"><strong>{groupName}</strong></h1>
            <svg className="edit-icon" onClick={editGroupName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528.899 528.899">
                <path className="edit-icon-colour" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                L27.473,390.597L0.3,512.69z"/>
            </svg>
        </div>
        <h4 className="created-date"><strong>Created On: {createdMonth + " " + createdDay + ", " + createdYear}</strong></h4>
        <div className="under-bar"></div>
    </div>
    )
}

export default GroupName;