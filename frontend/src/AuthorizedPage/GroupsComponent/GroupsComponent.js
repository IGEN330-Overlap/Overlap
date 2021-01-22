import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './GroupsComponent.css';
import dots from './three-dots.svg';
import line from './Line.svg';
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

    // //Display Dropdown Button
    // const groupDropdown = () => (
    //     <Dropdown as={ButtonGroup}>
    //         <Button variant="success">Group 1</Button>
    //         <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
    //         <Dropdown.Menu>
    //             <Dropdown.Item href="#/action-1"><a onClick={showCodeModal}>Show Group Code</a></Dropdown.Item>
    //             <Dropdown.Item href="#/action-2"><a onClick={showLeaveModal}>Leave Group</a></Dropdown.Item>
    //         </Dropdown.Menu>
    //     </Dropdown>
    // );


    return (
        // Flexbox for existing groups
        <div className="YourGroupsBox d-flex flex-column align-left">
            <h1 className="title"><strong>Groups</strong></h1>
            <div class="mr-auto"><img src={line} className="underline" alt="underline"/></div>

            { /*search bar */}
            <div className="search-bar">
                <input type="text" class="input-search" placeholder="search" size="15"/>
            </div>

            { /*list of groups */}
            <div className="group-list">

                {/* Group as a dropdown menu button */}
                <div className="group-item d-flex">
                    <Dropdown as={ButtonGroup}>
                        <Button variant="dark" className="groupButton" text-left>Group 1</Button>
                        <Dropdown.Toggle split variant="dark" className="groupToggle" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1"><a onClick={showCodeModal}>Show Group Code</a></Dropdown.Item>
                            <Dropdown.Divider></Dropdown.Divider>
                            <Dropdown.Item href="#/action-2"><a onClick={showLeaveModal}>Leave Group</a></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Group as a dropdown menu button
                <div className="group-item d-flex">
                    <groupDropdown/>
                </div>  */}
            </div>
    
            {/* "Show Group Code" Modal Content */}
            <>
                <Modal show={CodeisOpen} onHide={hideCodeModal} centered>
                    <Modal.Body className="in-modal modal-body">
                        <h5 className="modal-text"><strong>The Group Code for "Group Name" is</strong></h5>
                        <h4 className="modal-text pad-below"><strong>"Group Code"</strong></h4>
                        <button onClick={hideCodeModal} className="btn-in-modal continue-button" centered><strong>Continue</strong></button>
                    </Modal.Body>
                 </Modal>
            </>

            {/* "Leave Group" Modal Content */}
            <>
                <Modal show={LeaveisOpen} onHide={hideLeaveModal} centered>
                    <Modal.Body className="in-modal">
                        <h5 className="modal-text"><strong>Are you sure you want to leave?</strong></h5>
                        <h4 className="modal-text pad-below"><strong>"Group Name"</strong></h4>
                        <p><button className="btn-in-modal leave-buttons">Yes, I'm sure</button></p>
                        <p><button onClick={hideLeaveModal} className="btn-in-modal leave-buttons">Nope, take me back</button></p>
                    </Modal.Body>
                </Modal>
            </>

        </div>                
    );

}

export default GroupsComponent;