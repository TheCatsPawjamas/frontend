import { useState, useEffect } from 'react';
import "./Profilepage.css";


const Profilepage = (props) => {
    const {currentUser, cartItems, isOpen, userId, setCurrentUser, setIsAdmin, setUserId} = props;
    const [openEditForm, setOpenEditForm] = useState(false);
    const [ username, setUsername ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [pastPurchases,setPastPurchases] = useState([]);
    const [showPastPurchases, setShowPastPurchases] = useState(false);
    const BASE_URL = 'https://thecatspawjamasbackend.onrender.com/api';


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
            // const response = await fetch(`http://localhost:1337/api/users/me`, {
            const response = await fetch(`${BASE_URL}/users/me`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
            });
           
            const result = await response.json();
            setCurrentUser(result);
            setUserId(result.id);
            setIsAdmin(result.admin);
            setUsername(undefined);
            setEmail(undefined);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(Object.keys(currentUser).length){
            getPastPurchases();
        }else{
            console.log("current user is empty");
        }
    },[currentUser])

    async function getPastPurchases(){
        const tokenKey = localStorage.getItem("token");
        try {
            // const response = await fetch(`http://localhost:1337/api/orders/finishedOrder/${currentUser.id}`,{
            const response = await fetch(`${BASE_URL}/orders/finishedOrder/${currentUser.id}`,{
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
            // const response = await fetch(`http://localhost:1337/api/users/${currentUser.id}`, {
            const response = await fetch(`${BASE_URL}/users/${currentUser.id}`, {
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

    
   function handleShowPurchases(){
    setShowPastPurchases(!showPastPurchases);
    }


    return (
        <div className='profilePage'>
            
            
                <button id="profileEditButton" onClick={openEdit}>Edit Profile</button>
                {!openEditForm? null: (
                <div className='profileUpdateContent'>
                    <label className='editLabel'>Username:</label>
                    <input className='editInput' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label className='editLabel'>New Password:</label>
                    <input className='editInput' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <label className='editLabel'>Email:</label>
                    <input className='editInput' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br></br>
                    <button className="profileSettingButton" onClick={handleSaveClick}>Save</button>
                    <button className="profileSettingButton" onClick={openEdit}>Cancel</button>
                </div>
                )}
            
            <div className='profileOrders'>
                <h2 className='profileOrdersHeader'>Your Cart</h2>
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div className='pastPurchaseOrder' key={item.id}>
                            <p className='profilePurchaseText'>Adopted Kitty: {item.name}</p>
                            <p className='profilePurchaseText'>Prrrice: ${item.adoptionFee}</p>
                            <p><img className='pastPurchaseImg' src={item.imageURL}/></p>
                    </div>
                ))
            ) : (
                <p>No Orders Found</p>
            )}
            </div>
            <div className='completedPurchases'>
                <button id="profilePurchaseButton"onClick={handleShowPurchases}>See All Past Purchases</button>
                {!showPastPurchases? (null): 
                    <div>
                        <h2 className='completedPurchasesHeader'>Past Purchases</h2>
                            {pastPurchases && pastPurchases.length > 0 ? (
                                pastPurchases.map((item, index) => (
                                    <div className='pastPurchaseOrder' key={index+1}>
                                        <h2>Order #: {index+1}</h2>
                                        {/* <h3>The Cats:</h3> */}
                                        {
                                        item.cats.length ?   item.cats.map((individualCat)=>{
                                                return(
                                                <div key={individualCat.id}>
                                                    <p className='profilePurchaseText'>Adopted Kitty: {individualCat.name}</p>
                                                    <p className='profilePurchaseText'>Prrrice: ${individualCat.adoptionFee}</p>
                                                    <p><img className='pastPurchaseImg' src={individualCat.imageURL}/></p>
                                                    
                                                </div>
                                                )
                                            }) : <div>no Cats in that order</div>
                                        }
                                        <br/>
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