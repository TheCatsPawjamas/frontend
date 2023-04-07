import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Homepage, Login, SingleProduct, Cats, Registration, Cart, PaymentInfo, Profilepage } from "./components";

const App = () => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const [userId, setUserId] = useState();                 //should be storing the Id in state when we call /users/me
    // const db = require('./db');
    


                                         

    async function fetchCurrentUser(){
      if (localStorage.token){
          try {
              const response = await fetch(`http://localhost:1337/api/users/me`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                  },
                });

              const data = await response.json();

              setCurrentUser(data)
              setUserId(data.id);
              console.log(data.id)
              console.log("current user")
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
      
  },[])
  useEffect(()=>{
    console.log(userId);
    fetchCart();
  },[userId]);
  async function fetchCart(){     //new fetch call
      try {
        const response = await fetch(`http://localhost:1337/api/orders/cart/${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            },
          });

        const data = await response.json();

        console.log("our cart: ");
        console.log(data);
        setCartItems(data);
        console.log("current user")
    } catch (error) {
        console.log(error)
    }
  }


    const addItemToCart = (item) => {
        const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
      //fetch request
      // fetchCart();       
       //added this into the addItemsToCart function
        if (index === -1) {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
        } else {
          const updatedCartItems = [...cartItems];
          updatedCartItems[index].quantity++;
          setCartItems(updatedCartItems);
        }
      };

    const removeItemFromCart = (item) => {
        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
        const existingItem = cartItems[existingItemIndex];
      
        let updatedItems = [];
      
        if (existingItem.quantity === 1) {
          updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        } else {
          const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
          updatedItems = [...cartItems];
          updatedItems[existingItemIndex] = updatedItem;
        }
      
        setCartItems(updatedItems);
      };

    // async function addItemToCart(catId, orderId, adoptionFee) {
    //   try {
    //     const purchase = await db.addCatsToOrders({
    //       catId,
    //       orderId,
    //       adoptionFee
    //     });
    //     return purchase;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    
    // async function removeItemFromCart(purchaseId) {
    //   try {
    //     const purchase = await db.getPurchasesById(purchaseId);
    //     await db.deletePurchases(purchaseId);
    //     return purchase;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
      

    console.log(userId);
    console.log(currentUser);
    console.log(cartItems);
    return ( 
        <BrowserRouter>
            <div> 
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Routes>
                    <Route path='/' element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser = {setCurrentUser}/>}/>
                    <Route path='/register' element={<Registration isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser = {setCurrentUser}/>}/>
                    <Route path='/cats' element={<Cats addItemToCart={addItemToCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path='/cats/:id' element={<SingleProduct addItemToCart={addItemToCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path='/cart' element={<Cart cartItems={cartItems} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} />} />
                    <Route path='/profile' element={<Profilepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser}/>}/>
                    <Route path='/checkout' element={<PaymentInfo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />} />
                </Routes> 
            </div>
        </BrowserRouter> 
    ) 
}

const appElement = document.getElementById("app")
const root = createRoot(appElement)
root.render(<App />)
