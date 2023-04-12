import { useState, useEffect } from 'react';



const Profilepage = (props) => {
    const {currentUser, cartItems, isOpen} = props;
    const [openEditForm, setOpenEditForm] = useState(false);
    const [ username, setUsername ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [pastPurchases,setPastPurchases] = useState([]);
    const [showPastPurchases, setShowPastPurchases] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchUserData();
            getPastPurchases();
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
            console.log(error)
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = async () => {
        
        const tokenKey = localStorage.getItem("token");
        if (!username && !newPassword && !email) {
            alert("Can't leave any blank");
            return;
        }
        
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

            openEdit();
                

        } catch (error) {
            throw error;
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        if (isOpen) {
        toggleSettings();
        }
    };
    function openEdit(){
        setOpenEditForm(!openEditForm);
    }

    async function getPastPurchases(){
        const tokenKey = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:1337/api/orders/finishedOrder/${currentUser.id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
            })

            const result = await response.json();
            
            if(result){
                setPastPurchases(result);
                
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
   function handleShowPurchases(){
    setShowPastPurchases(!showPastPurchases);
    }

    return (
        <div className='profilePage'>
            
            
                <button className="button" onClick={openEdit}>Edit Profile</button>
                {!openEditForm? null: (
                <div className='profileUpdateContent'>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br></br>
                    <button className="profileSettingButton" onClick={handleSaveClick}>Save</button>
                    <button className="profileSettingButton" onClick={openEdit}>Cancel</button>
                </div>
                )}
            
            <div className='profileOrders'>
                <h2 className='profileOrdersHeader'>Your Cart</h2>
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
            <div className='completedPurchases'>
                <button className="button"onClick={handleShowPurchases}>See All Past Purchases</button>
                {!showPastPurchases? (null): 
                    <div>
                        <h2 className='completedPurchasesHeader'>Past Purchases</h2>
                            {pastPurchases && pastPurchases.length > 0 ? (
                                pastPurchases.map((item, index) => (
                                    <div key={index+1}>
                                        <p>Order #: {index+1}</p>
                                        <p>The Cats:</p>
                                        {
                                        item.cats.length ?   item.cats.map((individualCat)=>{
                                                return(
                                                <div key={individualCat.id}>
                                                    <p className='profilePurchaseText'>Adopted Kitty: {individualCat.name}</p>
                                                    <p className='profilePurchaseText'>Prrrice: ${individualCat.adoptionFee}</p>
                                                    <p className='profilePurchaseText'><img src={individualCat.imageURL}/></p>
                                                </div>
                                                )
                                            }) : <div>no Cats in that order</div>
                                        }
                                    </div>
                                ))
                            ) : (
                                <p>No Past Orders Found</p>
                            )}
                    </div>
                }
            </div>
        </div>
    )
}

export default Profilepage