import './CreateOrJoin.css';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateGroupList } from '../../Redux/Actions.js';

import Collapse from 'react-bootstrap/Collapse';
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import add_member from '../../GroupProfilePage/MemberDisplay/add-member.svg';
import plus_sign from '../../GroupProfilePage/PlaylistCarousel/add.svg';

const axios = require("axios");

var input_name = '';
var input_code = '';

//Component to display Create a new group or Join a group component
const CreateOrJoin = (props) => {

    const dispatch = useDispatch();

    const [openCreate, setCreateOpen] = React.useState(false);
    const [openJoin, setJoinOpen] = React.useState(false);

    const [group_code, setGroupCode] = useState('');
    const [target_code, setTargetCode] = useState('');
    const [group_name, setGroupName] = useState('');

    const spotifyID = useSelector(state => state.userObject);

    //functions for opening and closing "Show Group Code" Modal
    const [groupCodeOpen, setGroupCodeOpen] = React.useState(false);
    const showGroupCodeModal = () => {
        setGroupCodeOpen(true);
    };
    const hideGroupCodeModal = () => {
        setGroupCodeOpen(false);
    };
    
    //show join alert when no code entered
    const [showNoCodeAlert, setShowNoCodeAlert] = useState(false);

    //show join alert when code is invale
    const [showInvalidAlert, setShowInvalidAlert] = useState(false);

    //show no group name alert
    const [showNoNameAlert, setShowNoNameAlert] = useState(false);
    
    //show copy to clipboard alert
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    
    //Create new group on arrow click
    function createNewGroup(){
        input_name = document.getElementById("newGroupName").value
        if (input_name === "") {
            console.log('No group name entered!');
            setShowNoNameAlert(true);   
        }
        else {
            console.log(input_name);
            axios
            .post(process.env.REACT_APP_BACKEND_URL + "/groups/create", {
                name: input_name,
                spotifyID: spotifyID.userID,
            })
            .then((data) => {
                console.log(data.data.return)
                setTargetCode(data.data.return.groupCode);
                setGroupName(input_name);
                axios
                .get(process.env.REACT_APP_BACKEND_URL + "/users/" + spotifyID.userID + "/groups")
                .then((data) => {
                    dispatch(updateGroupList(data.data))
                    console.log(data.data);
                })
                .catch((err) => console.log(err))
                showGroupCodeModal();
            })
            .catch((err) => console.log(err));
            
        }
        document.getElementById("newGroupName").value = '';
    }

    //Join a group on arrow click
    function joinGroup(){
        input_code = document.getElementById("joinGroupCode").value.toUpperCase()
        if (input_code === "") {
            console.log('No group code entered!');
            setShowNoCodeAlert(true);
        }
        else {
            console.log(input_code)
            axios
            .post(process.env.REACT_APP_BACKEND_URL + "/groups/join", {
                groupCode: input_code,
                spotifyID: spotifyID.userID,
            })
            .then((data) => {
                console.log(data.data);
                setGroupCode(data.data.groupCode);
                axios
                .get(process.env.REACT_APP_BACKEND_URL + "/users/" + spotifyID.userID + "/groups")
                .then((data) => {
                    dispatch(updateGroupList(data.data));
                    console.log(data.data);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
                setShowInvalidAlert(true);
                console.log(err);
            });         
        }
        document.getElementById("joinGroupCode").value = '';
    }

    //Redirect to new group page when group_code changes
    useEffect(()=>{
        if(group_code !== '')
            window.location.href = "/authorized/group/" + group_code
    }, [group_code])

    //If key press for new group input is "Enter", run create group function
    const handleNewGroupKeyPress = (e) => {
        if(e.key === "Enter") {
            createNewGroup();
        }
    }

    //If key press for join group input is "Enter", run join group function
    const handleJoinGroupKeyPress = (e) => {
        if(e.key === "Enter") {
            joinGroup();
        }
    }

    // function copyGroupCode() {
    //     var copyText = document.getElementById("myCode");
    //     var currentRange;
    //     if (document.getSelection().rangeCount > 0) {
    //       currentRange = document.getSelection().getRangeAt(0);
    //       window.getSelection().removeRange(currentRange);
    //     } else {
    //       currentRange = false;
    //     }
    //     var CopyRange = document.createRange();
    //     CopyRange.selectNode(copyText);
    //     window.getSelection().addRange(CopyRange);
    //     document.execCommand("copy");
    
    //     window.getSelection().removeRange(CopyRange);
    //     if (currentRange) {
    //       window.getSelection().addRange(currentRange);
    //     }
    //   }

    function copyGroupCode(){
        let copy = document.getElementById("myCode");
        let copyText = copy.textContent;
        navigator.clipboard.writeText(copyText);
    }

    return (
        //Flexbox for creating or joining new group
        <div className="CreateOrJoinBox d-flex flex-column align-left">
            <div
                onClick={() => setCreateOpen(!openCreate)}
                aria-controls="example-collapse-text"
                aria-expanded={openCreate}
            >
            <h5 className="openCollapse"><img className="create_icon" src={plus_sign} alt="plus sign"/>Create a new group</h5>
            </div>
            <Collapse in={openCreate}>
                <div id="example-collapse-text" className="collapseBody">
                    <input type="text" className="input" placeholder="Enter Group Name" size="15" id="newGroupName" maxLength="25" onKeyPress={handleNewGroupKeyPress}/>
                    <div className="continue-arrow" onClick={createNewGroup}>
                        <svg 
                            height="429.92093pt" 
                            viewBox="0 0 429.92093 429.92093" 
                            width="429.92093pt" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow"
                        >
                            <path d="m366.960938 62.960938c-83.949219-83.949219-220.054688-83.949219-304 0-83.949219 83.945312-83.949219 220.050781 0 304 83.945312 83.945312 220.050781 83.945312 304 0 83.945312-83.949219 83.945312-220.054688 0-304zm-50.300782 159.097656-92.5 92.5c-1.875 1.890625-4.4375 2.9375-7.101562 2.902344-2.652344-.011719-5.195313-1.050782-7.097656-2.902344-1.871094-1.867188-2.925782-4.402344-2.925782-7.046875s1.054688-5.183594 2.925782-7.050781l75.5-75.5h-200.5c-5.523438 0-10-4.476563-10-10 0-5.523438 4.476562-10 10-10h200.5l-75.5-75.5c-3.894532-3.894532-3.894532-10.207032 0-14.101563 3.894531-3.890625 10.207031-3.890625 14.097656 0l92.5 92.5c3.828125 3.945313 3.875 10.203125.101562 14.199219zm0 0"/>
                        </svg>
                    </div>
                </div>
            </Collapse>
            {showNoNameAlert ? 
            <div className="create-error">
                <AlertCreateJoin type="warning" message="No group name entered!"/>
            </div>
            : null
            }
            {showNoNameAlert ? <div className="timeout"> {window.setTimeout(function(){setShowNoNameAlert(false)}, 1500)} </div> : null}

            <div
                onClick={() => setJoinOpen(!openJoin)}
                aria-controls="example-collapse-text"
                aria-expanded={openJoin}
            >
            <h5 className="openCollapse"><img className="join_icon"src={add_member} alt="join group icon"/>Join a group</h5>
            </div>
            <Collapse in={openJoin}>
                <div id="example-collapse-text" className="collapseBody">
                    <input type="text" className="input" placeholder="Enter Group Code" size="15" id="joinGroupCode" onKeyPress={handleJoinGroupKeyPress}/>
                    <div className="continue-arrow" onClick={joinGroup}>
                        <svg 
                            height="429.92093pt" 
                            viewBox="0 0 429.92093 429.92093" 
                            width="429.92093pt" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow"
                            >
                            <path d="m366.960938 62.960938c-83.949219-83.949219-220.054688-83.949219-304 0-83.949219 83.945312-83.949219 220.050781 0 304 83.945312 83.945312 220.050781 83.945312 304 0 83.945312-83.949219 83.945312-220.054688 0-304zm-50.300782 159.097656-92.5 92.5c-1.875 1.890625-4.4375 2.9375-7.101562 2.902344-2.652344-.011719-5.195313-1.050782-7.097656-2.902344-1.871094-1.867188-2.925782-4.402344-2.925782-7.046875s1.054688-5.183594 2.925782-7.050781l75.5-75.5h-200.5c-5.523438 0-10-4.476563-10-10 0-5.523438 4.476562-10 10-10h200.5l-75.5-75.5c-3.894532-3.894532-3.894532-10.207032 0-14.101563 3.894531-3.890625 10.207031-3.890625 14.097656 0l92.5 92.5c3.828125 3.945313 3.875 10.203125.101562 14.199219zm0 0"/>
                        </svg>
                    </div>
                </div>
            </Collapse>
            <Modal
                className="modalcss"
                show={groupCodeOpen}
                onHide={hideGroupCodeModal}
                centered
            >
                <Modal.Body className="in-modal modal-body">
                    <h5 className="modal-text modal-head">
                        <strong>Invite your friends to join <span>{group_name}</span>!</strong>
                    </h5>
                    <div id="myCode">
                    <h4 className="modal-text" type="text">
                        <strong>{target_code}</strong>
                    </h4>
                    </div>
                    <div className="copy-groupCode">
                        <div
                            onClick={() => {
                            copyGroupCode();
                            setShowCopyAlert(true);
                            }}
                            className="copy-button"
                        >
                            {showCopyAlert ? (
                            <AlertCopy />
                            ) : (
                            <svg
                                width="32"
                                height="34"
                                viewBox="0 0 32 34"
                                xmlns="http://www.w3.org/2000/svg"
                                className="clipboard"
                            >
                                <path d="M25.3333 2.83333H19.76C19.2 1.19 17.7333 0 16 0C14.2667 0 12.8 1.19 12.24 2.83333H6.66667C5.2 2.83333 4 4.10833 4 5.66667V28.3333C4 29.8917 5.2 31.1667 6.66667 31.1667H25.3333C26.8 31.1667 28 29.8917 28 28.3333V5.66667C28 4.10833 26.8 2.83333 25.3333 2.83333ZM16 2.83333C16.7333 2.83333 17.3333 3.47083 17.3333 4.25C17.3333 5.02917 16.7333 5.66667 16 5.66667C15.2667 5.66667 14.6667 5.02917 14.6667 4.25C14.6667 3.47083 15.2667 2.83333 16 2.83333ZM25.3333 28.3333H6.66667V5.66667H9.33333V9.91667H22.6667V5.66667H25.3333V28.3333Z" />
                            </svg>
                            )}
                            {showCopyAlert ? (
                            <div className="timeout">
                                {" "}
                                {window.setTimeout(function () {
                                setShowCopyAlert(false);
                                }, 1500)}{" "}
                            </div>
                            ) : null}
                        </div>  
                    </div>
                    <button
                        onClick={()=>{hideGroupCodeModal(); setGroupCode(target_code)}}
                        className="btn-in-modal continue-button"
                        centered
                    >
                        <strong>Continue to Group</strong>
                    </button>
                </Modal.Body>
            </Modal>
            {showNoCodeAlert ? 
            <div className="join-error">
                <AlertCreateJoin type="warning" message="No group code entered!"/>
            </div>
            : null
            }
            {showNoCodeAlert ? <div className="timeout"> {window.setTimeout(function(){setShowNoCodeAlert(false)}, 1500)} </div> : null}
            {showInvalidAlert ? 
            <div className="join-error">
                <AlertCreateJoin type="danger" message="Invalid group code!"/>
            </div>
            : null
            }
            {showInvalidAlert ? <div className="timeout"> {window.setTimeout(function(){setShowInvalidAlert(false)}, 1750)} </div> : null}
        </div>
    );
}

//join group error alert
function AlertCreateJoin (props) {
    return(
      <div className="error-alert">
        <Alert variant={props.type}>
          <p>{props.message}</p>
        </Alert>
      </div>
    )
}

function AlertCopy() {
    return (
      <div className="copy-alert">
        <Alert variant="success">
          <p>Copied to clipboard!</p>
        </Alert>
      </div>
    );
  }
export default CreateOrJoin;