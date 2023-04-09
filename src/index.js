import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Homepage, Login, SingleProduct, Cats, Registration, Cart, PaymentInfo, Profilepage, PurchaseComplete, AdminCats } from "./components";

const App = () => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const [userId, setUserId] = useState();                
    const [orderId, setOrderId] = useState();
    const [isAdmin, setIsAdmin] = useState(null);
    // const db = require('./db');

    useEffect(()=>{
      if(localStorage.getItem('token')){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false);

      }
    });
                                        
    async function fetchCurrentUser(){
      if (localStorage.token){
          try {
              const currentUserResponse = await fetch(`http://localhost:1337/api/users/me`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                  },
                });

              const currentUserData = await currentUserResponse.json();

              setCurrentUser(currentUserData)
              setUserId(currentUserData.id);
              setIsAdmin(currentUserData.admin);
              
              const cartResponse = await fetch(`http://localhost:1337/api/orders/cart/${currentUserData.id}`, {
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

  // useEffect(()=>{
  //     fetchCurrentUser();
      
  // },[])

  //ask violet about this useEffect and the one above
  useEffect(()=>{
    fetchCurrentUser();
    console.log(orderId);
    if(localStorage.getItem('token') && orderId> 0){
      console.log("Hitting the fetched cart async function");
      fetchCart();
    }
  },[orderId,isLoggedIn]);

  async function fetchCart(){     //new fetch call
      try {
        const response = await fetch(`http://localhost:1337/api/orders/${orderId}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                },
              });
    
            const data = await response.json();
    
            // console.log("our cats: ");
            // console.log(data);
            // console.log(data.cats);
            setCartItems(data.cats);
    } catch (error) {
        console.log(error)
    }
  }

  async function addCatToCart(item){
    try {
      const response = await fetch(`http://localhost:1337/api/orders/${orderId}/cats`,{
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
      console.log(data);

      setCartItems([...cartItems, data]);


    } catch (error) {
      
    }
  }

  async function deleteCatFromCart(item) {
    try {
      console.log(item);
      console.log(item.catId);
      console.log(orderId);
        // const response = await fetch(`${process.env.DATABASE_URL}/api/routines/${event.target.value}`,
        const response = await fetch(`http://localhost:1337/api/purchases/${item.catId}/${orderId}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
        const translatedResponse = await response.json();
        console.log(translatedResponse)
        if (translatedResponse.success) {
            let filteredCartItems = cartItems.filter((singleCat) => {
                if (singleCat.catId != translatedResponse.destroyPurchase.catId) {
                    return singleCat
                }
            })
            console.log("This is my filtered cart items after deleting: ");
            console.log(filteredCartItems);
            setCartItems(filteredCartItems);

            // myRoutines = filteredMyRoutines
        }
    
    } catch (error) {
        console.log(error);
    }
}


    const addItemToCart = (item) => {
        const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
      //fetch request
      // fetchCart();
          
       //added this into the addItemsToCart function
        if (index === -1) {
          addCatToCart(item)   
          // setCartItems([...cartItems, { ...item, quantity: 1 }]);
        } 
        // else {
        //   const updatedCartItems = [...cartItems];
        //   updatedCartItems[index].quantity++;
        //   setCartItems(updatedCartItems);
        // }
      };

    const removeItemFromCart = (item) => {
       // let updatedItems = [];
       console.log(item);
        deleteCatFromCart(item);
        // if (existingItem.quantity === 1) {

        //   updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        // } 
        // else {
        //   const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
        //   updatedItems = [...cartItems];
        //   updatedItems[existingItemIndex] = updatedItem;
        // }
      
        // setCartItems(updatedItems);
      };      

    // console.log(userId);
    console.log(currentUser);
    console.log(cartItems);
    console.log(isAdmin);
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
                    <Route path='/cart' element={<Cart cartItems={cartItems} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/profile' element={<Profilepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} cartItems={cartItems}/>}/>
                    <Route path='/checkout' element={<PaymentInfo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} orderId={orderId}/>} />
                    <Route path='/purchasecomplete' element={<PurchaseComplete isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} cartItems={cartItems} orderId={orderId}/>}/>
                    <Route path='/admincats' element={<AdminCats isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
                </Routes> 
            </div>
        </BrowserRouter> 
    ) 
}

const appElement = document.getElementById("app")
const root = createRoot(appElement)
root.render(<App />)
