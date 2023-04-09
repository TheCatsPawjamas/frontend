import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Homepage.css';
import catMeme from '../images/Screenshot 2023-04-02 at 9.21.31 PM.png'

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
            <div id="homeContainer">
                <div id="catHomepage">
                    <img src={catMeme} id="catMeme"></img>
                </div>
                <div className='homeContent'>
                    <h1 className='homeContent'>Welcome to The Cats Pawjamas! Feel free to look at all the Purrrfect Kitties and login/register when you're ready to grab one out of our paws!</h1>               
                    <Link id="loginHyperlink" to='/login'> Login to an existing acount </Link>
                    {/* <br/> */}
                    <Link id='registerHyperlink' to='/register'> Register for a new account </Link>
                </div>
            </div>
            
  
        </div> 
   )
}

export default Homepage;