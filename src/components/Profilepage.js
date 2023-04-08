import { useState, useEffect } from 'react';

const Settings = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSettings = () => setIsOpen(!isOpen);
    return (
        <div>
            {props.children && <button onClick={toggleSettings}>{props.children[0]}</button>}
            {isOpen && props.children && <div>{props.children[1]}</div>}
        </div>
    );
};

const Profilepage = (props) => {
    const {currentUser, cartItems} = props;
    const [ username, setUsername ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [isEditing, setIsEditing] = useState(false);

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
            const response = await fetch('http://localhost:1337/api/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
            });
            const result = await response.json();
            setUsername(result.username);
            setEmail(result.email);
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
        console.log(currentUser.id);
        try {
            const response = await fetch(`http://localhost:1337/api/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                    username: username,
                    password: newPassword,
                    email: email
                })
            });
            const result = await response.json();
            console.log(result)
            if(result){
                setIsEditing(false);
            }
        } catch (error) {
            throw error;
        }
    }

    const handleCancelClick = () => {
        setIsEditing(false);
        toggleSettings();
    }

    console.log("This is the profilepage's cart items: ");
    console.log(cartItems);

    return (
        <div className='profilePage'>
            <Settings className='profileSettingsComp'>
                <button onClick={handleEditClick}>Edit Profile</button>
                <div className='profileUpdateContent'>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => {handleCancelClick(); toggleSettings();}}>Cancel</button>
                </div>
            </Settings>
            <div className='profileOrders'>
                <h2 className='profileOrdersHeader'>Your Previous Orders</h2>
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id}>
                            <p className='profileOrderText'>Adopted Kitty: {item.name}</p>
                            <p className='profileOrderText'>Prrrice: ${item.adoptionFee}</p>
                            <p className='profileOrderText'><img src={item.imageURL}/></p>
                    </div>
                ))
            ) : (
                <p>No Orders Found</p>
            )}
            </div>
        </div>
    )
}

export default Profilepage