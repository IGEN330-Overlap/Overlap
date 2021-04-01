import React, { useState } from 'react';
// import { render } from 'react-dom';
import { useSelector } from 'react-redux';

import './MemberDisplay.css';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import add_member from './add-member.svg';
import logo_small from './logo small.svg';

const MemberDisplay = ({groupUsers, groupCode, toCompare}) => {

  const userObject = useSelector(state => state.userObject)

  // primary user
  const primary_user = userObject ? userObject.name : ''
  let primary_icon = userObject ? userObject.imageURL : ''

  primary_icon = primary_icon ? primary_icon : logo_small;

  // group members
  const members = []
  let icon_src = []
  const member_id = []
  groupUsers.map((member,i) => {
    if (member.name !== primary_user) {
      members[i] = member.name
      icon_src[i] = member.imageURL ? member.imageURL : logo_small;
      member_id[i] = member.userID
    }
    return members
  })

  //show alert
  const [show, setShow] = useState(false);

  /* popover content*/
  const popover = (
    <Popover id="popover-basic" className="popover-display">
      <Popover.Title as="h3">Your Group Code</Popover.Title>
      <Popover.Content>
          <div className="copy-code">
            <div id = "myCode">{groupCode}</div>
            <div onClick={()=>{copyCode(); setShow(true)}} className="copy-button">
              <svg width="32" height="34" viewBox="0 0 32 34" xmlns="http://www.w3.org/2000/svg" className = "clipboard">
                <path 
                  d="M25.3333 2.83333H19.76C19.2 1.19 17.7333 0 16 0C14.2667 0 12.8 1.19 12.24 2.83333H6.66667C5.2 2.83333 4 4.10833 4 5.66667V28.3333C4 29.8917 5.2 31.1667 6.66667 31.1667H25.3333C26.8 31.1667 28 29.8917 28 28.3333V5.66667C28 4.10833 26.8 2.83333 25.3333 2.83333ZM16 2.83333C16.7333 2.83333 17.3333 3.47083 17.3333 4.25C17.3333 5.02917 16.7333 5.66667 16 5.66667C15.2667 5.66667 14.6667 5.02917 14.6667 4.25C14.6667 3.47083 15.2667 2.83333 16 2.83333ZM25.3333 28.3333H6.66667V5.66667H9.33333V9.91667H22.6667V5.66667H25.3333V28.3333Z" 
                />
              </svg>
            </div>
          </div>
      </Popover.Content>
    </Popover>
  );

  /*popover display*/
  const AddMember = () => (
    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
      <div className="add-member"><img src={add_member} alt="add-member"/></div>
    </OverlayTrigger>
  );

  return(
    <div className="member-container">
        <div className="d-flex">
            <h1 className="text"><strong>Members</strong></h1>
            {/*link to add members*/}
            <AddMember />
            <br></br>
            {show ? 
              <AlertCopy /> 
            : null}
            {show ? window.setTimeout(function(){setShow(false)}, 1500) : null}         
        </div>

        <h1 className="compare-message"><strong>Click on a friend to see the overlap in your listening habits!</strong></h1>

        {/*user icon display */}

        <div className="display-members">
            <div className="icon-container">
                <img className="user-icon" src={primary_icon} alt={primary_user} onClick={() => toCompare('')}></img>
                <div className="user-name" onClick={() => toCompare('')}>
                  <strong>{primary_user}</strong>
                </div>
            </div>
            {members.map((member,i) => (
                <div className="icon-container" key={i}>
                    <img className="user-icon" src={icon_src[i]} alt={member} onClick={() => toCompare(member_id[i])}></img>
                    <div className="user-name" onClick={() => toCompare(member_id[i])}>
                            <strong>{member}</strong>
                    </div>
                </div>
            ))
            }
        </div>
    </div>
  )
}

function AlertCopy () {
    return(
      <div className="copy-alert">
        <Alert  variant="success">
          <p>Copied to clipboard!</p>
        </Alert>
      </div>
    )
}

function copyCode(){
  var copyText = document.getElementById("myCode");
  var currentRange;
  if(document.getSelection().rangeCount > 0) {
    currentRange = document.getSelection().getRangeAt(0);
    window.getSelection().removeRange(currentRange);
  }
  else {
    currentRange = false;
  }
  var CopyRange = document.createRange();
  CopyRange.selectNode(copyText);
  window.getSelection().addRange(CopyRange);
  document.execCommand("copy");

  window.getSelection().removeRange(CopyRange);
  if(currentRange) {
    window.getSelection().addRange(currentRange);
  }
}

export default MemberDisplay;