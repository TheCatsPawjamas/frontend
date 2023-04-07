import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = (props) => {

  const { cartItems, addItemToCart, removeItemFromCart, isLoggedIn, setIsLoggedIn } = props;


  // const [items, setItems] = useState(
  //   cartItems ? cartItems.map((item) => ({ ...item, initialPrice: item.price})): []
  // );


  const [pajamasCount, setPajamasCount] = useState(0);


  const [totalPrice, setTotalPrice] = useState([]);
    
  //   cartItems.reduce(
  //   (accumulator, current) => accumulator + current.adoptionFee,
  //   0
  // ));




  // useEffect(() => {
  //   setPajamasCount(0);
  // }, [cartItems]);


  // useEffect(() => {
  //   setTotalPrice(cartItems.reduce((accumulator, current) => accumulator + current.adoptionFee, 0) + (pajamasCount * 25));
  // }, [cartItems, pajamasCount]);


  // const handleQuantityChange = (item, quantity) => {
  //   const updatedItems = items.map((i) => {
  //     if (i.id === item.id) {
  //       return { ...i, quantity, initialPrice: i.price * quantity };
  //     }
  //     return i;
  //   });
  //   setItems(updatedItems);
  // };


  const handleAddToCart = (item) => {
    const updatedItem = {
      ...item,
      quantity: item.quantity + 1,
      updatedPrice: (item.updatedPrice || item.price) + item.price,
    };
    addItemToCart(updatedItem);
  };

  // useEffect(()=>{

  // },[cartItems])

  const handleAddPajamas = () => {
    setTotalPrice(totalPrice + 25);
    setPajamasCount(pajamasCount + 1);
  }


  return (
    <div className="cart">
      {!isLoggedIn? <h2>Please Sign in to add to a cart</h2>:
      <div>
        <h2>Your Cart</h2>
        {cartItems?.length === 0 ? (
          <p id="emptyCart">Your cart is empty</p>
        ) : (
          <div>
            <div className="cartItems">
              {cartItems?.map((item) => (
                <div key={item.id} className="cartItem">
                  <div >
                    <img className="cartItemImage" src={item.imageURL} alt={item.name} />
                  </div>
                  <div className="cartItemDetails">
                    <p className="cartItemName">{item.name}</p>
                    <p className="cartItemPrice">${Number(item.adoptionFee)}</p>

                    <div className="cartItemQuantity">
                      <button
                        onClick={() => {
                          // const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
                          // handleQuantityChange(item, newQuantity);
                          removeItemFromCart(item);
                        }}
                      >
                        -
                      </button>
                      {/* <p>{item.quantity}</p>
                      <button
                        onClick={() => {
                          // const newQuantity = item.quantity + 1;
                          // handleQuantityChange(item, newQuantity);
                          addItemToCart(item);
                        }}
                      >
                        +
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cartTotal">
              <p>Total: ${totalPrice}</p>
            </div>
            <div className="bottomOfPage">
              <div className="pjInfo">
                <img id="pjImage" alt="Image of a cat wearing pajamas" src="https://img.ltwebstatic.com/images3_pi/2022/06/27/165631496683fc01fc37e2c05bb2ca0dacd1b1f4c1_thumbnail_900x.webp"/>
                <button id="pjButton" onClick={handleAddPajamas}>Click here to add a cozy pair of pajamas for $25</button>
                <p id="pjCount">Pajamas count: {pajamasCount}</p>
              </div>
              <div>
                <Link id="continueShoppingLink" to={`/cats`}>Continue shopping</Link>
                <Link to={'/checkout'}> Checkout </Link>
              </div>
            </div>
          </div>
        )}

    </div>
    }

      
      

    </div>
  );
};

export default Cart;

