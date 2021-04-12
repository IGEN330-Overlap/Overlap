import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateGroupList } from "../../Redux/Actions.js";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import "./GroupsComponent.css";
import line from "./Line.svg";
import { Link } from "react-router-dom";
import { ReactComponent as RefreshIcon } from "./refresh.svg";

const axios = require("axios");

//Component to display groups on Groups page
const GroupsComponent = (props) => {
  const dispatch = useDispatch();

  //variables for using states
  const groupList = useSelector((state) => state.groupList);
  const spotifyID = useSelector((state) => state.userObject);

  //order groupList from most recent to oldest
  function sortGroupList(a, b) {
    if (b.createdAt > a.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;

    return 0;
  }
  groupList.sort(sortGroupList);

  //functions for opening and closing "Show Group Code" Modal
  const [CodeisOpen, setCodeIsOpen] = React.useState(false);
  const showCodeModal = () => {
    setCodeIsOpen(true);
  };
  const hideCodeModal = () => {
    setCodeIsOpen(false);
  };

  //functions for opening and closing "Leave Group" Modal
  const [LeaveisOpen, setLeaveIsOpen] = React.useState(false);
  const showLeaveModal = () => {
    setLeaveIsOpen(true);
  };
  const hideLeaveModal = () => {
    setLeaveIsOpen(false);
  };

  //set group code state
  const [groupCodeState, setCode] = useState("");
  //set group name state
  const [groupNameState, setName] = useState("");

  //search bar state
  const [searchText, setSearch] = useState("");
  const editSearch = (e) => {
    setSearch(e.target.value);
  };
  const dynamicSearch = () => {
    return groupList.filter((x) =>
      x.groupName.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  //custom toggle as three dots
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <svg
        width="1.25vw"
        height="100%"
        viewBox="0 0 16 4"
        xmlns="http://www.w3.org/2000/svg"
        className="dots"
      >
        <ellipse cx="2.07407" cy="50%" rx="2.07407" ry="2" />
        <ellipse cx="8.0001" cy="50%" rx="2.07407" ry="2" />
        <ellipse cx="13.9259" cy="50%" rx="2.07407" ry="2" />
      </svg>
    </div>
  ));

  //show copy to clipboard alert
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  // function copyCode() {
  //   var copyText = document.getElementById("myCode");
  //   var currentRange;
  //   if (document.getSelection().rangeCount > 0) {
  //     currentRange = document.getSelection().getRangeAt(0);
  //     window.getSelection().removeRange(currentRange);
  //   } else {
  //     currentRange = false;
  //   }
  //   var CopyRange = document.createRange();
  //   CopyRange.selectNode(copyText);
  //   window.getSelection().addRange(CopyRange);
  //   document.execCommand("copy");

  //   window.getSelection().removeRange(CopyRange);
  //   if (currentRange) {
  //     window.getSelection().addRange(currentRange);
  //   }
  // }

  function copyCode(){
    let copy = document.getElementById("myCode");
    let copyText = copy.textContent;
    navigator.clipboard.writeText(copyText);
}

  function leaveGroup() {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/groups/leave", {
        groupCode: groupCodeState,
        spotifyID: spotifyID.userID,
      })
      .then((data) => {
        axios
          .get(
            process.env.REACT_APP_BACKEND_URL +
              "/users/" +
              spotifyID.userID +
              "/groups"
          )
          .then((data) => {
            dispatch(updateGroupList(data.data));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    // Flexbox for existing groups
    <div className="YourGroupsBox d-flex flex-column align-left">
      <div className="d-flex flex-row title-flex align-items-center">
        <h1 className="title">
          <strong>Groups</strong>
        </h1>
        <RefreshIcon className="refresh-icon" onClick={props.refreshPage}/>
      </div>

      <div className="mr-auto">
        <img src={line} className="underline" alt="underline" />
      </div>

      {/* search bar */}
      <div className="search-bar">
        <input
          type="text"
          name="search-bar"
          value={searchText.value}
          onChange={editSearch}
          className="input-search"
          placeholder="Search"
          size="15"
        />
      </div>

      <div className="group-list">
        {props.groupLoading && <Spinner animation="border" className="loading-spinner"/>}
        {(dynamicSearch().length === 0 && !props.groupLoading) && <div className="no-groups-text" dir="ltr">Sorry, we can't find any groups for you.</div>}
        {dynamicSearch().map((group, i) => (
          /* Group as a dropdown menu button */
          <div key={i} className="group-item d-flex">
            <Dropdown as={ButtonGroup}>
              <Link
                to={"/authorized/group/" + group.groupCode}
                className="groupButton"
              >
                {group.groupName}
              </Link>

              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu className="menu">
                <Dropdown.Item>
                  <div
                    onClick={() => {
                      showCodeModal();
                      setCode(group.groupCode);
                      setName(group.groupName);
                    }}
                  >
                    Show Group Code
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item>
                  <div
                    onClick={() => {
                      showLeaveModal();
                      setCode(group.groupCode);
                      setName(group.groupName);
                    }}
                  >
                    Leave Group
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ))}
      </div>

      {/* "Show Group Code" Modal Content */}
      <>
        <Modal
          className="modalcss"
          show={CodeisOpen}
          onHide={hideCodeModal}
          centered
        >
          <Modal.Body className="in-modal modal-body">
            <h5 className="modal-text modal-head">
              <strong>{groupNameState} Code</strong>
            </h5>
            <div id="myCode">
              <h4 className="modal-text" type="text">
                <strong>{groupCodeState}</strong>
              </h4>
            </div>
            <div className="copy-groupCode">
              <div
                onClick={() => {
                  copyCode();
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
              onClick={hideCodeModal}
              className="btn-in-modal continue-button"
              centered
            >
              <strong>Continue</strong>
            </button>
          </Modal.Body>
        </Modal>
      </>

      {/* "Leave Group" Modal Content */}
      <>
        <Modal
          className="modalcss"
          show={LeaveisOpen}
          onHide={hideLeaveModal}
          centered
        >
          <Modal.Body className="in-modal">
            <h5 className="modal-text modal-head">
              <strong>Are you sure you want to leave?</strong>
            </h5>
            <h4 className="modal-text">
              <strong>{groupNameState}</strong>
            </h4>
            <p>
              <button
                className="btn-in-modal leave-buttons"
                onClick={() => {
                  hideLeaveModal();
                  leaveGroup();
                }}
              >
                Yes, I'm sure.
              </button>
            </p>
            <p>
              <button
                onClick={hideLeaveModal}
                className="btn-in-modal leave-buttons"
              >
                No, I want to stay!
              </button>
            </p>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

function AlertCopy() {
  return (
    <div className="copy-alert">
      <Alert variant="success">
        <p>Copied to clipboard!</p>
      </Alert>
    </div>
  );
}

export default GroupsComponent;
