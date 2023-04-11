import React from "react"
import { useState } from "react"

const PurchaseComplete = (props) => {
    const { setIsLoggedIn, currentUser, cartItems, orderId, totalPrice, setTotalPrice } = props
    const [ confirmation, setConfirmation ] = useState("")
    const [ message, setMessage ] = useState("")

    function orderDetails(){
        
        const confirmationNumber = Math.random().toString().substr(2,10);
        setConfirmation(confirmationNumber)
        const message = ("Your order is complete! Thank you for choosing Cat Pawjamas, please come and pickup your new furry friend from 1234 Purrrfect Lane Meowville, Milwaukitty 051421. See you soon!")
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
                <h2> {currentUser.username}, Review Order Details </h2>

                {
                    cartItems.filter(item => item.creditCard === currentUser.creditCard).map((product) => {
                        return (
                            <section key={product.id}>
                                <img src={product.imageURL} alt="Product Image"/>
                                <p> UserID: {currentUser.id}</p>
                                <p> Cart: {product.name} </p>
                                <p> Cat ID: {product.id}</p>
                                <p> Breed: {product.breed}</p>
                                <p> Adoption Fee: {product.adoptionFee}</p>
                                <p> Age: {product.age}</p>

                                {/* only shows up when pajamas are added to the cart */}
                                <p> Total After Tax: {Number(totalPrice) * .075 + Number(totalPrice)} </p> 
                                <p> Order ID: {orderId}</p>
                              
                            </section>
                            ) 
                        })
                }

            <button onClick={CompleteOrder}> Submit Order </button>
            <p> {message}</p>
            <p> Confirmation Number: {confirmation}</p>
            </div>
        </section>

    )
}
   
export default PurchaseComplete;
