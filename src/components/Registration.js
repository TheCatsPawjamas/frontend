import { useState } from "react"

const Registration = (props) => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState ("")


    async function accountRegistration () {

        try {
            if (username.length < 8 ) {
                alert ("Username does not meet requirements, please try again");
                return;
            } else if ( password.length < 8 ) {
                alert ("Password does not meet requirements, please try again")
                return;
            }
            const response = await fetch (`http://localhost:1337/api/users/register`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify ({
                    user: {
                        username: username, 
                        password: password,
                        email: email 
                    }
                })
            });
        
            const resultData = await response.json(); 

            console.log(resultData)

            if (!resultData.token) {
                alert("Unable to create account, please try again!")
            } else {
                const myJWT = resultData.token;
                localStorage.setItem("token", myJWT)
                // will have to create a component for currentUser and send down through props - will most likely be in the root index.js
                setCurrentUser(resultData.user)
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
                <input className = "emailBox"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button id="submitButton" type="submit"> Create Account </button>
            </form>
        </section>
    )
}

export default Registration 