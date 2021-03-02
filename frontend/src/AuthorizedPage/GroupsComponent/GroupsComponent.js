import React from "react";
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './GroupsComponent.css';
import line from './Line.svg';
import { Link, useRouteMatch } from 'react-router-dom';
import { updateGroupList } from "../../Redux/Actions";

//Component to display groups on Groups page
const GroupsComponent = (props) => {
    
    //use relative url for react router
    let { path, url } = useRouteMatch();
    const groupList = useSelector(state => state.groupList);

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
            className="dots">
            <ellipse cx="2.07407" cy="50%" rx="2.07407" ry="2" />
            <ellipse cx="8.0001" cy="50%" rx="2.07407" ry="2" />  
            <ellipse cx="13.9259" cy="50%" rx="2.07407" ry="2" />     
            </svg>
        </div>
    ));

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
 
    return (
        // Flexbox for existing groups
        <div className="YourGroupsBox d-flex flex-column align-left">
            <h1 className="title"><strong>Groups</strong></h1>
            <div class="mr-auto"><img src={line} className="underline" alt="underline"/></div>

            { /*search bar -- INPUT DOES NOT DO ANYTHING*/}
            <div className="search-bar">
                <input type="text" class="input-search" placeholder="search" size="15"/>
            </div>

            <div className="group-list">
                {groupList.map((group,i) => (
                    /* Group as a dropdown menu button */
                    <div className="group-item d-flex">
                    <Dropdown as={ButtonGroup}>

                        <Link to ={`${url}GroupProfilePage/GroupProfilePage`} className="groupButton">{group.groupName}</Link>

                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu className="menu">
                            <Dropdown.Item><div onClick={showCodeModal}>Show Group Code</div></Dropdown.Item>
                            <Dropdown.Divider></Dropdown.Divider>
                            <Dropdown.Item><div onClick={showLeaveModal}>Leave Group</div></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                ))
                }
            </div>
    
            {/* "Show Group Code" Modal Content */}
            <>
                <Modal className="modalcss" show={CodeisOpen} onHide={hideCodeModal} centered>
                    <Modal.Body className="in-modal modal-body">
                        {/* "Group Name" should be real group name endpoint */}
                        <h5 className="modal-text modal-head"><strong>"Group Name" Code</strong></h5>
                        {/* "EXAMPLE" to be replaced with a real code */}
                        <div id="myCode"><h4 className="modal-text" type="text"><strong>Example</strong></h4></div>
                        <div className = "copy-groupCode">
                            <div onClick={copyCode} className="copy-button">
                                <svg width="32" height="34" viewBox="0 0 32 34" xmlns="http://www.w3.org/2000/svg" className = "clipboard">
                                    <path 
                                    d="M25.3333 2.83333H19.76C19.2 1.19 17.7333 0 16 0C14.2667 0 12.8 1.19 12.24 2.83333H6.66667C5.2 2.83333 4 4.10833 4 5.66667V28.3333C4 29.8917 5.2 31.1667 6.66667 31.1667H25.3333C26.8 31.1667 28 29.8917 28 28.3333V5.66667C28 4.10833 26.8 2.83333 25.3333 2.83333ZM16 2.83333C16.7333 2.83333 17.3333 3.47083 17.3333 4.25C17.3333 5.02917 16.7333 5.66667 16 5.66667C15.2667 5.66667 14.6667 5.02917 14.6667 4.25C14.6667 3.47083 15.2667 2.83333 16 2.83333ZM25.3333 28.3333H6.66667V5.66667H9.33333V9.91667H22.6667V5.66667H25.3333V28.3333Z" 
                                    />
                                </svg>
                            </div>
                        </div>
                        <button onClick={hideCodeModal} className="btn-in-modal continue-button" centered><strong>Continue</strong></button>
                    </Modal.Body>
                 </Modal>
            </>

            {/* "Leave Group" Modal Content */}
            <>
                <Modal className="modalcss" show={LeaveisOpen} onHide={hideLeaveModal} centered>
                    <Modal.Body className="in-modal">
                        <h5 className="modal-text modal-head"><strong>Are you sure you want to leave?</strong></h5>
                        {/* "Group Name" to be replaced with real group name endpoint */}
                        <h4 className="modal-text"><strong>"Group Name"</strong></h4>
                        {/* BUTTON BELOW DOES NOT LINK TO ANYTHING */}
                        <p><button className="btn-in-modal leave-buttons">Yes, I'm sure</button></p>
                        <p><button onClick={hideLeaveModal} className="btn-in-modal leave-buttons">Nope, take me back</button></p>
                    </Modal.Body>
                </Modal>
            </>

        </div>                
    );

}

export default GroupsComponent;