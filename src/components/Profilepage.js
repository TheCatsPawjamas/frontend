import { useState, useEffect } from 'react';

const Profilepage = (props) => {

    const [ username, setUsername ] = useState("");
    const [ userPassword, setUserPassword ] = useState("");
    const [ userEmail, setUserEmail ] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchUserData();
        } else {
            props.setIsLoggedIn(false);
        }
    }, []);

    const fetchUserData = async () => {
        const tokenKey = localStorage.getItem("token");
        try {
            const response = await fetch('', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
            });
            const result = await response.json();
            setUsername(result.username);
            setUserPassword(result.password);
            setUserEmail(result.email);
        } catch (error) {
            throw error;
        }
    }

    return (
        <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            <label>Email:</label>
            <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        </div>
    )
}

export default Profilepage