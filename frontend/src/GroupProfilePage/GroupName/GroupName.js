import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GroupName.css';
import {ReactComponent as RefreshIcon} from "./refresh.svg"
import { updateGroupList } from "../../Redux/Actions.js";

import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

import closeButton from "../PlaylistCarousel/close-x.svg";

const axios = require("axios");

// display group name on group profile page
const GroupName = ({groupCode, groupName, createdDate, setLoading, refreshPage}) => {

    const userObject = useSelector((state) => state.userObject)
    const dispatch = useDispatch();

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

    const [showEdit, setShowEdit] = useState(false)
    const showEditModal = () => {
        setShowEdit(true);
    }
    const hideEditModal = () => {
        setShowEdit(false);
    }

    //If key press for new group input is "Enter", run edit group name function
     const handleNewNameKeyPress = (e) => {
        if(e.key === "Enter") {
            editGroupName();
        }
    }

    const editGroupName = () => {
        let input_name = document.getElementById("newGroupName").value
        if (input_name === "") {
            console.log('No group name entered!');
            setShowNoNameAlert(true);   
        } else {
            axios
            .post(process.env.REACT_APP_BACKEND_URL + "/groups/changeGroupName", {
                newGroupName: input_name,
                groupCode: groupCode,
            })
            .then((data) => {
                console.log(data.data);
                axios
                .get(process.env.REACT_APP_BACKEND_URL + "/users/" + userObject.userID + "/groups")
                .then((data) => {
                  dispatch(updateGroupList(data.data));
                })
                .catch((err) => {
                  console.log(err);
                })
            })
            .catch((err) => console.log(err));

            hideEditModal();
            setLoading(true);
        }
    }

    //show no group name alert
    const [showNoNameAlert, setShowNoNameAlert] = useState(false);

    return(
    <div className="group-name-container">
        <div className="group-name-edit">
        <h1 className="text"><strong>{groupName}</strong>
          <svg className="edit-icon" onClick={showEditModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528.899 528.899">
              <path className="edit-icon-colour" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
              c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
              C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
              L27.473,390.597L0.3,512.69z"/>
          </svg>
          <RefreshIcon className="refresh-icon" onClick={refreshPage}/>
        </h1>
            
        </div>
        <h4 className="created-date"><strong>Created On: {createdMonth + " " + createdDay + ", " + createdYear}</strong></h4>
        <div className="under-bar"></div>
        <Modal
          className="modalcss edit-name-modal"
          show={showEdit}
          onHide={hideEditModal}
          centered
        >
          <Modal.Body className="in-modal">
            <h5 className="modal-text modal-head">
                <img src={closeButton} alt="close" className="cancel-rename" onClick={hideEditModal}/>
              <strong>Enter your new group name:</strong>
            </h5>
            <input type="text" className="input-rename" placeholder="Enter Group Name" size="15" id="newGroupName" maxLength="25" onKeyPress={handleNewNameKeyPress}/>
            <div className="rename">
              <button
                className="btn-in-modal edit-name-buttons"
                onClick={() => {
                  editGroupName()
                }}
              >
                Rename Group
              </button>
              {showNoNameAlert ? 
                <div className="edit-name-error">
                    <AlertEditName type="warning" message="No group name entered!"/>
                </div>
                : null
              }
              {showNoNameAlert ? <div className="timeout"> {window.setTimeout(function(){setShowNoNameAlert(false)}, 1500)} </div> : null}
            </div>
          </Modal.Body>
        </Modal>
    </div>
    )
}

// group name edit error alert
function AlertEditName (props) {
    return(
      <div className="error-alert">
        <Alert variant={props.type}>
          <p>{props.message}</p>
        </Alert>
      </div>
    )
}

export default GroupName;