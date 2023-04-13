import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Homepage, Login, SingleProduct, Cats, Registration, Cart, PaymentInfo, Profilepage, PurchaseComplete, AdminCats, AdminUsers, AdminHomepage, EditForm } from "./components";

const App = () => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const [userId, setUserId] = useState();                
    const [orderId, setOrderId] = useState();
    const [isAdmin, setIsAdmin] = useState(null);
    const [totalPrice, setTotalPrice] = useState([]);
    const BASE_URL = 'https://thecatspawjamasbackend.onrender.com/api';


    useEffect(()=>{
      if(localStorage.getItem('token')){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false);

      }
    },[]);
                                        
    async function fetchCurrentUser(){
      if (localStorage.token){
          try {
              // const currentUserResponse = await fetch(`http://localhost:1337/api/users/me`, {
              const currentUserResponse = await fetch(`${BASE_URL}/users/me`, {

                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                  },
                });

              const currentUserData = await currentUserResponse.json();

              setCurrentUser(currentUserData)
              setUserId(currentUserData.id);
              setIsAdmin(currentUserData.admin);
              
              // const cartResponse = await fetch(`http://localhost:1337/api/orders/cart/${currentUserData.id}`, {
              const cartResponse = await fetch(`${BASE_URL}/orders/cart/${currentUserData.id}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                },
              });
    
            const cartData = await cartResponse.json();
    
            // console.log("our cart: ");
            // console.log(cartData);
            setOrderId(cartData.id);
          } catch (error) {
              console.log(error)
          }
      }
      else{
          setCurrentUser("")
      }
  }

  useEffect(()=>{
    fetchCurrentUser();
    if(localStorage.getItem('token') && orderId> 0){
      fetchCart();
    }
  },[orderId,isLoggedIn]);

  async function fetchCart(){    
      try {
        // const response = await fetch(`http://localhost:1337/api/orders/${orderId}`, {
        const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                },
              });
    
            const data = await response.json();

            setCartItems(data.cats);
    } catch (error) {
        console.log(error)
    }
  }

  async function addCatToCart(item){
    try {
      // const response = await fetch(`http://localhost:1337/api/orders/${orderId}/cats`,{
      const response = await fetch(`${BASE_URL}/orders/${orderId}/cats`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
        },
        body: JSON.stringify({
          catId: item.catId,
          adoptionFee: item.adoptionFee
        })
      })
      const data = await response.json();

      setCartItems([...cartItems, data]);


    } catch (error) {
      
    }
  }

  async function deleteCatFromCart(item) {
    try {
        // const response = await fetch(`http://localhost:1337/api/purchases/${item.catId}/${orderId}`,
        const response = await fetch(`${BASE_URL}/purchases/${item.catId}/${orderId}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
        const translatedResponse = await response.json();
      
        if (translatedResponse.success) {
            let filteredCartItems = cartItems.filter((singleCat) => {
                if (singleCat.catId != translatedResponse.destroyPurchase.catId) {
                    return singleCat
                }
            })

            setCartItems(filteredCartItems);

            
        }
    
    } catch (error) {
        console.log(error);
    }
}


    const addItemToCart = (item) => {
        const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);

        if (index === -1) {
          addCatToCart(item)
          setTotalPrice(Number(totalPrice) + Number(item.adoptionFee));   
         
        } 

      };

    const removeItemFromCart = (item) => {
        deleteCatFromCart(item);
        setTotalPrice(Number(totalPrice) - Number(item.adoptionFee));
      };      

    return ( 
        <BrowserRouter>
            <div> 
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCartItems={setCartItems} setCurrentUser={setCurrentUser} setOrderId={setOrderId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
                <Routes>
                    <Route path='/' element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser = {setCurrentUser}/>}/>
                    <Route path='/register' element={<Registration isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser = {setCurrentUser}/>}/>
                    <Route path='/cats' element={<Cats addItemToCart={addItemToCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path='/cats/:id' element={<SingleProduct addItemToCart={addItemToCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path='/cart' element={<Cart cartItems={cartItems} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>} />
                    <Route path='/profile' element={<Profilepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} cartItems={cartItems} userId={userId} setCurrentUser={setCurrentUser} setUserId={setUserId} setIsAdmin={setIsAdmin}/>}/>
                    <Route path='/checkout' element={<PaymentInfo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} orderId={orderId} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>} />
                    <Route path='/purchasecomplete' element={<PurchaseComplete isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} cartItems={cartItems} orderId={orderId} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>
                    <Route path='/admincats' element={<AdminCats isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} currentUser={currentUser}/>} />
                    <Route path='/adminusers' element={<AdminUsers isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} currentUser={currentUser}/>}/>
                    <Route path='/adminhomepage' element={<AdminHomepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} currentUser={currentUser}/>}/>
                </Routes> 
            </div>
        </BrowserRouter> 
    ) 
}

const appElement = document.getElementById("app")
const root = createRoot(appElement)
root.render(<App />)
