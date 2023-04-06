import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Registration.css"

const Registration = (props) => {
    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn} = props;
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState ("")
    const { setCurrentUser } = props 


    async function accountRegistration (event) {
        event.preventDefault();
        try {
            if (username.length < 8 ) {
                alert ("Username does not meet requirements, please try again");
                return;
            } else if ( password.length < 8 ) {
                alert ("Password does not meet requirements, please try again")
                return;
            }
            console.log("About to fetch request");
            const response = await fetch (`http://localhost:1337/api/users/register`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify ({
                    
                        username: username, 
                        password: password,
                        email: email 
                    
                })
            });
        
            const resultData = await response.json(); 

            console.log(resultData)

            if (!resultData.token) {
                alert("Unable to create account, please try again!")
            } else {
                const myJWT = resultData.token;
                localStorage.setItem("token", myJWT)
                setIsLoggedIn(!isLoggedIn);
                setCurrentUser(resultData.user)
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section id="registerSection"> 
            <h3 id="registerHeader"> Create New Account </h3>
            
            <form className="registrationForm" onSubmit={accountRegistration}> 
                <input className = "registrationBox"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input className = "registrationBox"
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input className = "registrationBox"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button id="submitButton" type="submit"> Create Account </button>
            </form>

        </section>
    )
}

export default Registration 

