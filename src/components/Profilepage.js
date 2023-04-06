import { useState, useEffect } from 'react';

const Settings = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSettings = () => setIsOpen(!isOpen);
    return (
        <div>
            <button onClick={toggleSettings}>{props.children[0]}</button>
            {isOpen && <div>{props.children[1]}</div>}
        </div>
    );
};

const Profilepage = (props) => {
    const {currentUser} = props;
    const [ username, setUsername ] = useState("");
    const [ userPassword, setUserPassword ] = useState("");
    const [ userEmail, setUserEmail ] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchUserData();
            fetchOrders();
        } else {
            props.setIsLoggedIn(false);
        }
    }, []);

    const fetchUserData = async () => {
        const tokenKey = localStorage.getItem("token");
        try {
            const response = await fetch('http://localhost:1337/api/users/me', {
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

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = async () => {
        setIsEditing(false);
        const tokenKey = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:1337/api/users/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                    username: username,
                    password: userPassword,
                    email: userEmail
                })
            });
            const result = await response.json();
        } catch (error) {
            throw error;
        }
    }

    const handleCancelClick = () => {
        setIsEditing(false);
    }

    const fetchOrders = async () => {
        const tokenKey = localStorage.getItem("token");
        try {
            const response = await fetch('',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
            });
            const result = await response.json();
            setOrders(result);
        } catch (error) {
            throw error;
        }
    }

    return (
        <div>
            <Settings>
                <button onClick={handleEditClick}>Edit Profile</button>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Password:</label>
                    <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                    <label>Email:</label>
                    <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            </Settings>
            <div>
                <h2>Orders</h2>
                {orders.map((order) => (
                    <div key={order.id}>
                        <p>Adopted Kitty: {order.productName}</p>
                        <p>Prrrice: {order.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profilepage