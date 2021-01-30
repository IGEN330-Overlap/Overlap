import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './GroupsComponent.css';
import line from './Line.svg';
import copy from './copy.svg';
import React from "react";


//Component to display groups on Groups page
const GroupsComponent = (props) => {
    
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
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          <svg
            width="16"
            height="4"
            viewBox="0 0 16 4"
            xmlns="http://www.w3.org/2000/svg"
            className="dots">
            <ellipse cx="2.07407" cy="2" rx="2.07407" ry="2" />
            <ellipse cx="8.0001" cy="2" rx="2.07407" ry="2" />  
            <ellipse cx="13.9259" cy="2" rx="2.07407" ry="2" />     
            </svg>
        </a>
    ));

    // THIS DOES NOT WORK FOR SOME REASON
    // //Display Dropdown Button Function
    // const groupDropdown = () => (
    //     <Dropdown as={ButtonGroup}>
        //     <a className="groupButton">Group 1</a>
        //     <Dropdown.Toggle as={CustomToggle} />
        //     <Dropdown.Menu className="menu">
        //         <Dropdown.Item href="#/action-1"><a onClick={showCodeModal}>Show Group Code</a></Dropdown.Item>
        //         <Dropdown.Divider></Dropdown.Divider>
        //         <Dropdown.Item href="#/action-2"><a onClick={showLeaveModal}>Leave Group</a></Dropdown.Item>
        //     </Dropdown.Menu>
        // </Dropdown>
    // );

    //Copy code -- does not work rn
    function copyCode(){
        var copyText = document.getElementById("myCode");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
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

            { /*list of groups -- NON ITERATIVE RN*/}
            <div className="group-list">

                {/* Group as a dropdown menu button */}
                <div className="group-item d-flex">
                    <Dropdown as={ButtonGroup}>
                        {/* THIS LINK DOES NOT CONNECT TO ANYTHING */}
                        <a className="groupButton">Group 1</a>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu className="menu">
                            <Dropdown.Item href="#/action-1"><a onClick={showCodeModal}>Show Group Code</a></Dropdown.Item>
                            <Dropdown.Divider></Dropdown.Divider>
                            <Dropdown.Item href="#/action-2"><a onClick={showLeaveModal}>Leave Group</a></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Group as a dropdown menu button from function (function call) -- THIS IS PART OF THE STUFF THAT DOES NOT WORK BUT WANT TO FIX
                <div className="group-item d-flex">
                    <groupDropdown/>
                </div>  */}
            </div>
    
            {/* "Show Group Code" Modal Content */}
            <>
                <Modal className="modalcss" show={CodeisOpen} onHide={hideCodeModal} centered>
                    <Modal.Body className="in-modal modal-body">
                        {/* "Group Name" should be real group name endpoint */}
                        <h5 className="modal-text modal-head"><strong>"Group Name" Code</strong></h5>
                        {/* "EXAMPLE" to be replaced with a real code */}
                        <h4 className="modal-text" id="myCode" type="text"><strong>"EXAMPLE"</strong>
                            {/* COPY DOES NOT WORK and copy button does not change colour on hover - need fix*/}
                            <a onCLick={copyCode} className="copy-button">
                                <img src={copy}/>
                            </a>
                        </h4>
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