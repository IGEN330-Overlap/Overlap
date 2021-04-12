import React, { useState } from 'react';
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

  //show copy to clipboard alert
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  /* popover content*/
  const popover = (
    <Popover id="popover-basic" className="popover-display">
      <Popover.Title as="h3">Your Group Code</Popover.Title>
      <Popover.Content>
          <div className="copy-code">
            <div id = "myCode">{groupCode}</div>
            <div onClick={()=>{copyCode(); setShowCopyAlert(true)}} className="copy-button">
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
      <div className="add-member">
        <svg 
            width="36" 
            height="18" 
            viewBox="0 0 25 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
          <path 
              className="add-member-icon"
              d="M8.33333 5.38462H5.20833V2.15385H3.125V5.38462H0V7.53846H3.125V10.7692H5.20833V7.53846H8.33333V5.38462ZM18.75 6.46154C20.4792 6.46154 21.8646 5.01846 21.8646 3.23077C21.8646 1.44308 20.4792 0 18.75 0C18.4167 0 18.0938 0.053846 17.8021 0.150769C18.3958 1.02308 18.7396 2.07846 18.7396 3.23077C18.7396 4.38308 18.3854 5.42769 17.8021 6.31077C18.0938 6.40769 18.4167 6.46154 18.75 6.46154ZM13.5417 6.46154C15.2708 6.46154 16.6562 5.01846 16.6562 3.23077C16.6562 1.44308 15.2708 0 13.5417 0C11.8125 0 10.4167 1.44308 10.4167 3.23077C10.4167 5.01846 11.8125 6.46154 13.5417 6.46154ZM20.4375 8.78769C21.3021 9.57385 21.875 10.5754 21.875 11.8462V14H25V11.8462C25 10.1877 22.5312 9.16462 20.4375 8.78769ZM13.5417 8.61539C11.4583 8.61539 7.29167 9.69231 7.29167 11.8462V14H19.7917V11.8462C19.7917 9.69231 15.625 8.61539 13.5417 8.61539Z" 
              fill="#fefffe"/>
        </svg>
      </div>
    </OverlayTrigger>
  );

  return(
    <div className="member-container">
        <div className="d-flex">
            <h1 className="text"><strong>Members</strong></h1>
            {/*link to add members*/}
            <AddMember />
            <br></br>
            {showCopyAlert ? 
              <AlertCopy /> 
            : null}
            {showCopyAlert ? <div className="timeout"> {window.setTimeout(function(){setShowCopyAlert(false)}, 1500)} </div> : null}
        </div>

        <h1 className="compare-message"><strong>Click on a friend to see the overlap in your top tracks and artists!</strong></h1>

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
        <Alert variant="success">
          <p>Copied to clipboard!</p>
        </Alert>
      </div>
    )
}

// function copyCode(){
//   var copyText = document.getElementById("myCode");
//   var currentRange;
//   if(document.getSelection().rangeCount > 0) {
//     currentRange = document.getSelection().getRangeAt(0);
//     window.getSelection().removeRange(currentRange);
//   }
//   else {
//     currentRange = false;
//   }
//   var CopyRange = document.createRange();
//   CopyRange.selectNode(copyText);
//   window.getSelection().addRange(CopyRange);
//   document.execCommand("copy");

//   window.getSelection().removeRange(CopyRange);
//   if(currentRange) {
//     window.getSelection().addRange(currentRange);
//   }
// }

function copyCode(){
  let copy = document.getElementById("myCode");
  let copyText = copy.textContent;
  navigator.clipboard.writeText(copyText);
}

export default MemberDisplay;