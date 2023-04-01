
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from "../images/Screenshot 2023-03-31 at 6.08.31 PM Small.jpeg";


const Navbar = (props) => {
    const { isLoggedIn } = props;
    const navigate = useNavigate();


    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        props.setIsLoggedIn(false);
        navigate('/');
    }

    return(
        <header id="mainHeaderNavbar">
            {/* <img id="headerLogo" src="/logo.jpg" alt="Fitness Tracker logos"/> */}
                    <div id="headerNavbar">  

                        <Link to='/' id="homeNavbar"> Home </Link>
                        <Link to='/cats' id="allCatsNavbar"> The Cats </Link> 
                        {/* {isLoggedIn ?<Link to='/myroutines' className="headerButton"> My Orders </Link>: undefined } */}
                        {/* {!isLoggedIn ? undefined: <Link to='/cart'><img src={cart}></img></Link>} */}
                        
                        {/* {isLoggedIn ? <Link to='/myroutines' className="headerButton"> My Routines </Link> : <a href="#" onClick={() => alert("error")} className="headerButton"> My Routines </a>} */}
                        {/* <Link to='/activities' className="headerButton"> Activities </Link> */}
                        {!isLoggedIn ? <Link to='/login' id="loginNavbar"> Login </Link> : <Link onClick={handleLogout} className="headerButton"> Logout </Link>}
                        <Link to='/cart'><img src={cart}></img></Link>
                    </div>  
        </header>
    )
}

export default Navbar
