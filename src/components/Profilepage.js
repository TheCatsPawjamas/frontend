import { useState, useEffect } from 'react';

const MyProfile = (props) => {

    const { username, setUsername } = useState("");
    const { userPassword, setUserPassword } = useState("");
    const { userEmail, setUserEmail } = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchMyUserData();
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
            setUserId(result.id);
            fetchUsername(result.username);
        } catch (error) {
            throw error
        }
    }

    async function fetchUsername(username) {
        try {
            const response = await fetch('', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            setUsername(result);
        } catch (error) {
            throw error;
        }
    }

    



    return (

    )
}