import React,  { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './MemberDisplay.css';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { updateGroupUsers } from '../../Redux/Actions.js';


// import brendan_icon from './brendan-icon.jpg';
// import kitten_icon from './kitten-icon.jpg';
// import puppy_icon from './puppy-icon.jpg';
// import kitten2 from './kitten2.jpg'
import add_member from './add-member.svg';

// /* primary user */
// const primary_user = ['me']
// const primary_icon = [kitten2]

// /* take input from backend to create array of users */
// const members = ['Brendan','Cat','Puppy','Brendan','Cat','Puppy','Brendan','Cat','Puppy','Brendan','Cat','Puppy','Brendan','Cat','Puppy','Brendan','Cat','Puppy'];
// const icon_src = [brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon];

const axios = require("axios");

const MemberDisplay = ({name, toCompare}) => {

    const dispatch = useDispatch();

    const groupCode = useSelector((state)=> state.groupList.groupCode);

    const getGroupUsers = useSelector((state) => state.groupUsers);
    const myUsername = []
    const myUserIcon = []
    getGroupUsers.map((member,i) => {
      myUsername[i] = member.Name
      myUserIcon[i] = member.imageURL
    })

    const primary_user = useSelector((state) => state.userObject.name);
    const primary_icon = useSelector((state) => state.userObject.imageURL);

    useEffect(() => {
      axios
      .get(process.env.REACT_APP_BACKEND_URL + "/groups/" + "4GPMB43W" + "/Users", {
      })
      .then((data) => {
        dispatch(updateGroupUsers(data.data))
        console.log(data);
      })
      .catch((err) => console.log(err));
  },);


    return(
            <div className="member-container">
                <div className="d-flex">
                    <h1 className="text"><strong>Members</strong></h1>
                    {/*link to add members*/}
                    <AddMember />
                    <br></br>            
                    
                </div>

                <h1 className="compare-message"><strong>Click on a friend to compare stats!</strong></h1>

                {/*user icon display */}

                <div className="display-members">
                    <div className="icon-container">
                        <img className="user-icon" src={primary_icon} alt={primary_user} onClick={() => toCompare()}></img>
                        <div className="user-name" onClick={() => toCompare()}>
                          <strong>{primary_user}</strong>
                        </div>
                    </div>
                    {myUsername.map((member,i) => (
                        <div className="icon-container">
                            <img className="user-icon" src={ myUserIcon[i]} alt={member} onClick={() => toCompare(member)}></img>
                            <div className="user-name" onClick={() => toCompare(member)}>
                                    <strong>{member}</strong>
                            </div>
                        </div>
                    ))
                    }

                </div>
            </div>
    )
}

/* popover content*/
const popover = (
    <Popover id="popover-basic" className="popover-display">
      <Popover.Title as="h3">Your Group Code</Popover.Title>
      <Popover.Content>
          <div className="copy-code">
            <div id = "myCode">Group Code</div>
            <div onClick={copyCode} className="copy-button">
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