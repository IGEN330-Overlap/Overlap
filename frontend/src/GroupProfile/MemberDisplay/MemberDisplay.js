import React from 'react';
import './MemberDisplay.css';
import brendan_icon from './brendan-icon.jpg';
import kitten_icon from './kitten-icon.jpg';
import puppy_icon from './puppy-icon.jpg';
import icon from './brendan-icon.jpg';
import add_member from './add-member.svg';
import { Popover, OverlayTrigger } from 'react-bootstrap';

/*take input from backend to create array of users */
const members = ['Brendan','cat','puppy','Brendan','cat','puppy','Brendan','cat','puppy','Brendan','cat','puppy','Brendan','cat','puppy','Brendan','cat','puppy'];
const num_members = members.length;
const icon_src = [brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon];

const MemberDisplay = (props) => {
    return(
        <div className="member-container">
            <div className="d-flex">
                <h1 className="text"><strong>Members</strong></h1>
                {/*link to add members*/}
                <AddMember />
            </div>
    
            {/*user icon display */}

            <div className="display-members">

                {icon_src.map(icon => (
                    <div className="icon-container">
                        <img className="user-icon" src={icon} alt={members}></img>
                        <div className="user-name">
                                <strong>{members[0]}</strong>
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
            <input type="text" value="Example code" id="myCode" />
            <a onClick={copyCode} className="copy-button"><h4>Copy</h4></a>
          </div>
      </Popover.Content>
    </Popover>
  );
  
  /*popover display*/
  const AddMember = () => (
    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
      <a className="add-member"><img src={add_member} /></a>
    </OverlayTrigger>
  );

  /*copy code*/
  function copyCode(){
      var copyText = document.getElementById("myCode");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
  }
  
  export default MemberDisplay;