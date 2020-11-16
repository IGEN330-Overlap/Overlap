import './HomePage.css';
import LoginButton from '../LoginButton/LoginButton';

//Home page component
//Takes loggedIn boolean as a prop
const HomePage = (props) => {
    return (
        <div>
            {/* LoginButton is active when not logged in */}
            <LoginButton active={!props.loggedIn} />
        </div>
    );
}

export default HomePage;
