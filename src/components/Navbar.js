
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from "../images/Screenshot 2023-03-31 at 6.08.31 PM Small.png";
import './Navbar.css';


const Navbar = (props) => {
    const { isLoggedIn, setCartItems, setCurrentUser, setOrderId, setUserId, isAdmin, setIsAdmin } = props;
    const navigate = useNavigate();


    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        props.setIsLoggedIn(false);
        setCartItems([]);
        setCurrentUser({});
        setUserId();
        setOrderId();
        navigate('/');

    }

    
    
    return(
        <header id="mainHeaderNavbar">
          
                    <div id="headerNavbar">  

                        <Link to='/' id="homeNavbar"> Home </Link>
                        <Link to='/cats' id="allCatsNavbar"> The Cats </Link> 
                 
                        {isLoggedIn  && isAdmin==false ? <Link to='/profile' id="loginNavbar"> Profile </Link> : <a href="#" onClick={() => alert("error")} className="headerButton"></a>}
                        {isLoggedIn && isAdmin==true ? <Link to='/adminhomepage' id="loginNavbar"> Admin </Link> : <a href="#" onClick={() => alert("error")} className="headerButton"></a>}
                        
                        {!isLoggedIn ? <Link to='/login' id="loginNavbar"> Login </Link> : <Link onClick={handleLogout} className="headerButton"> Logout </Link>}
                        <Link to='/cart' id='cartImgNavbar'><img src={cart} id="cartImg"></img></Link>
                    </div>  
        </header>
    )
}

export default Navbar
