import React from 'react';
import './MemberDisplay.css';
import icon from './brendan-icon.jpg';
import add_member from './add-member.svg';

/*take input from backend to create array of users */
const members = ['Brendan','Brendan'];
const num_members = members.length;
const icon_src = [];

const MemberDisplay = (props) => {
    return(
        <div className="landing-root">
            <div className="member-container">
                <div className="d-flex">
                    <h1 className="text"><strong>Members</strong></h1>
                    {/*link to add members*/}
                    <a className="add-member" href="">
                        <img src={add_member} />
                    </a>
                </div>
                <div className="d-flex justify-content-start flex-wrap">
                    <div className="icon-container">
                        <img className="user-icon" src={icon} alt="brendan"></img>
                        <div className="user-name">
                            <strong>Brendan</strong>
                        </div>
                    </div>
                    <div className="icon-container">
                        <img className="user-icon" src={icon} alt="brendan"></img>
                        <div className="user-name">
                            <strong>Brendan</strong>
                        </div>
                    </div>
                    <div className="icon-container">
                        <img className="user-icon" src={icon} alt="brendan"></img>
                        <div className="user-name">
                            <strong>Brendan</strong>
                        </div>
                    </div>
                    <div className="icon-container">
                        <img className="user-icon" src={icon} alt="brendan"></img>
                        <div className="user-name">
                            <strong>Brendan</strong>
                        </div>
                    </div>
                    <div className="icon-container">
                        <img className="user-icon" src={icon} alt="brendan"></img>
                        <div className="user-name">
                            <strong>Brendan</strong>
                        </div>
                    </div>
                    <div className="icon-container">
                        <img className="user-icon" src={icon} alt="brendan"></img>
                        <div className="user-name">
                            <strong>Brendan</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberDisplay;