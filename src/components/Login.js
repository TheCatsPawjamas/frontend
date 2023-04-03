import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
// local host user: http://localhost:1337/api 

const Login = (props) => {
    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn} = props;
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    async function loginFunction(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:1337/api/users/login`, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
            },
              body: JSON.stringify ({
                username: username,
                password: password
              })
            });
            console.log("login is working")
            const result = await response.json();
            console.log(result)
            if (!result.token) {
                alert("username or password is incorrect, please try again")
            } else {
                const myJWT = result.token;
                localStorage.setItem("token", myJWT)
                // setCurrentUser(result.user)
                setIsLoggedIn(!isLoggedIn);
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section id="loginSection">
        <h3 id="loginHeader"> Login to your account</h3>
        <form onSubmit={loginFunction}>
            <input className="loginBox"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input className="loginBox"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button className="loginButton" type="submit"> Login </button>
        </form>
        <Link id="registrationLink" to="/register">Don't have an Account? Sign Up here for free!</Link>
    </section>
    )
}

export default Login