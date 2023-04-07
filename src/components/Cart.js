import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = (props) => {

  const { cartItems, addItemToCart, removeItemFromCart } = props;


  const [items, setItems] = useState(
    cartItems ? cartItems.map((item) => ({ ...item, initialPrice: item.price})): []
  );


  const [pajamasCount, setPajamasCount] = useState(0);


  const [totalPrice, setTotalPrice] = useState(items.reduce(
    (accumulator, current) => accumulator + current.initialPrice,
    0
  ));


  useEffect(() => {
    if(cartItems) {
      setItems( cartItems.map((item) => ({ ...item, initialPrice: item.price})))
    } ;
  }, [cartItems]);


  useEffect(() => {
    setPajamasCount(0);
  }, [cartItems]);


  useEffect(() => {
    setTotalPrice(items.reduce((accumulator, current) => accumulator + current.initialPrice, 0) + (pajamasCount * 25));
  }, [items, pajamasCount]);


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


  const handleAddPajamas = () => {
    setTotalPrice(totalPrice + 25);
    setPajamasCount(pajamasCount + 1);
  }


  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p id="emptyCart">Your cart is empty</p>
      ) : (
        <div>
          <div className="cartItems">
            {items.map((item) => (
              <div key={item.id} className="cartItem">
                <div >
                  <img className="cartItemImage" src={item.image} alt={item.name} />
                </div>
                <div className="cartItemDetails">
                  <p className="cartItemName">{item.name}</p>
                  <p className="cartItemPrice">${Number(item.price) * item.quantity}</p>

                  <div className="cartItemQuantity">
                    <button
                      onClick={() => {
                        // const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
                        // handleQuantityChange(item, newQuantity);
                        removeItemFromCart(item, -1);
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
  );
};

export default Cart;

