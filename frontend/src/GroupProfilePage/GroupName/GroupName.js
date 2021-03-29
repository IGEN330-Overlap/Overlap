import React from 'react';
import './GroupName.css';

// display group name on group profile page

const GroupName = ({groupName, createdDate}) => {
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
    
    return(
    <div className="group-name-container">
        <h1 className="text"><strong>{groupName}</strong></h1>
        <h4 className="created-date"><strong>Created On: {createdMonth + " " + createdDay + ", " + createdYear}</strong></h4>
        <div className="under-bar"></div>
    </div>
    )
}

export default GroupName;