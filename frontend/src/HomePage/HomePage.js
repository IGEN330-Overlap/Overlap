import './HomePage.css';
import LoginButton from '../LoginButton/LoginButton';


const HomePage = (props) => {
    return (
        <div>
            <LoginButton active={!props.loggedIn} />
        </div>
    );
}

export default HomePage;
