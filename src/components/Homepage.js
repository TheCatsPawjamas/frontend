import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Homepage= (props) => {
    const { isLoggedIn,setIsLoggedIn } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        props.setIsLoggedIn(false);
        navigate('./');
      }

    return(
        <div id="home">
            <div id='homeContent'>
                <h1>Welcome to The Cats Pawjamas! Feel free to look at all the Purrrfect Kitties and login/register when your ready grab one out of our paws!</h1>               
            </div>
            <Link id="loginHyperlink" to='/login'> Click here to Login to your account </Link>
            <br/>
            <Link to='/register'>Click here to register for a free account</Link>
        </div> 
   )
}

export default Homepage;