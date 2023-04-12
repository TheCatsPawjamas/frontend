import React from "react"
import { useState } from "react"
import "./PurchaseComplete.css"

const PurchaseComplete = (props) => {
    const { setIsLoggedIn, currentUser, cartItems, orderId, totalPrice, setTotalPrice } = props
    const [ confirmation, setConfirmation ] = useState("")
    const [ message, setMessage ] = useState("")

    function orderDetails(){
        
        const confirmationNumber = Math.random().toString().substr(2,10);
        setConfirmation(confirmationNumber)
        const message = ("your order is complete! Thank you for choosing The Cat Pawjamas, please come and pickup your new furry friend from 1234 Purrrfect Lane Meowville, Milwaukitty 051421. See you soon!")
        setMessage(message)
    }

    async function CompleteOrder () {
    try {
        const response = await fetch(`http://localhost:1337/api/orders/purchaseComplete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const result = await response.json();
        
        if (Object.keys(result).length) {
            orderDetails()
        }
    } catch (error) {
        console.log(error)
    }
}


    return (
        <section id="purchaseCompleteSection">
            <div>
                <h2 id="purchaseCompleteHeader"> {currentUser.username}, Review Order Details </h2>

                {
                    cartItems.filter(item => item.creditCard === currentUser.creditCard).map((product) => {
                        return (
                            <section id="orderDetailsSection"key={product.id}>
                                <ul>
                                    <img id="orderImage" src={product.imageURL} alt="Product Image"/>
                                    <li>
                                        <div id="orderDetails">
                                            <p>UserID: {currentUser.id}</p>
                                            <p>Cat: {product.name} </p>
                                            <p>Cat ID: {product.id}</p>
                                            <p>Breed: {product.breed}</p>
                                            <p>Adoption Fee: {product.adoptionFee}</p>
                                            <p>Age: {product.age}</p>
                                            <p>Total After Tax: {Number(totalPrice) * .075 + Number(totalPrice)}</p> 
                                            <p>Order ID: {orderId}</p>
                                        </div>  
                                    </li>
                                </ul>
                            </section>
                            ) 
                        })
                }

            <button id="submitOrder" onClick={CompleteOrder}> Submit Order </button>
            <div id="confirmation">
                <p> {currentUser.username}, {message}</p>
                <p> Confirmation Number: {confirmation}</p>
            </div>
            </div>
        </section>

    )
}
   
export default PurchaseComplete;
