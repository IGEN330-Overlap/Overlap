import React from 'react';
import './MemberDisplay.css';
import { MyInsights, Comparisons } from '../IndividualComparisons/IndividualComparisons';
import brendan_icon from './brendan-icon.jpg';
import kitten_icon from './kitten-icon.jpg';
import puppy_icon from './puppy-icon.jpg';
import kitten2 from './kitten2.jpg'
import add_member from './add-member.svg';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { useState } from 'react';

/*take input from backend to create array of users */
const members = ['Cat2','Brendan','Cat','Puppy','Brendan','Cat','Puppy','Brendan','Cat','Puppy','Brendan','Cat','Puppy','Brendan','Cat','Puppy','Brendan','Cat','Puppy'];
const icon_src = [kitten2, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon, brendan_icon, kitten_icon, puppy_icon];

const MemberDisplay = (props) => {

    const [name, toCompare] = useState('');

    return(
        <div className="member-comparison-flex">
            <div className="member-container">
                <div className="d-flex">
                    <h1 className="text"><strong>Members</strong></h1>
                    {/*link to add members*/}
                    <AddMember />
                </div>
        
                {/*user icon display */}

                <div className="display-members">
                    {members.map((member,i) => (
                        <div className="icon-container">
                            <img className="user-icon" src={icon_src[i]} alt={member} onClick={() => toCompare(member)}></img>
                            <div className="user-name" onClick={() => toCompare(member)}>
                                    <strong>{member}</strong>
                            </div>
                        </div>
                    ))
                    }

                </div>
            </div>
            <div className="individual-comparisons">
                {name 
                    ? <Comparisons name={name} /> 
                    : <MyInsights />}
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