import React from "react"
import { useState } from "react"

const PurchaseComplete = (props) => {
    const { setIsLoggedIn, currentUser } = props
    const [ confirmation, setConfirmation ] = useState("")
    const [ orderId, setOrderId ] = useState("")
    const [ message, setMessage ] = useState("")

    function sendMessage() {
        setMessage("Your order is complete! Thank you for choosing Cat Pawjamas, please come and pickup your new furry friend from 1234 Purrrfect Lane, Meowville 051421. See you soon!");
    }

    function createConfirmationNumber(){
        const confirmationNumber = Math.random().toString().substr(2,10);
        setConfirmation(confirmationNumber)
    }

    function orderDetails(){
        sendMessage();
        createConfirmationNumber()
    }

    return (
        <section id="purchaseCompleteSection"> 
            <div>
                <h2> {currentUser.username}, click the button below for your order details </h2>
                <button onClick={orderDetails}> Order Details </button>
                <p> {message} </p>
                <p> Confirmation Number: {confirmation} </p>
            </div>
        </section>
    )
}

export default PurchaseComplete;

