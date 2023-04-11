import { useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import "./PaymentInfo.css";
import React from "react";

const PaymentInfo = (props) => {
    const { setIsLoggedIn, currentUser, cartItems, orderId } = props
    const [ creditCardName, setCreditCardName ] = useState("")
    const [ creditCard, setCreditCard ] = useState("")
    const [ creditCardExpirationDate, setCreditCardExpirationDate ] = useState("")
    const [ creditCardCVC, setCreditCardCVC ] = useState("")
     
    const navigate = useNavigate();


    useEffect ( () => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            
        } else {
            setIsLoggedIn(false)
            console.log("No token exist")
        }
    }, []);

    async function Payment (event) {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:1337/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify ({
                    creditCardName: creditCardName,
                    creditCard: creditCard, 
                    creditCardExpirationDate: creditCardExpirationDate,
                    creditCardCVC: creditCardCVC,
                })
            }) 
            const result = await response.json();
            
            if(Object.keys(result).length){
                navigate("/purchasecomplete")

            }

           
        } catch (error) {
            console.log(error)
        }
        
    }

    const formComplete = creditCardName && creditCard && creditCardExpirationDate && creditCardCVC
    return (
        <section id="paymentSection"> 
            <h3 id="paymentHeader"> To continue, please provide your payment information below</h3>

            
            <form className="paymentForm"onSubmit={Payment}> 


                <label> Full Name </label>
                <input id="nameOnCC" className="paymentBox"
                    type="text"
                    placeholder="Name On Card"
                    value={creditCardName}
                    onChange={(event) => setCreditCardName(event.target.value)}
                />

                <label> Credit Card Number</label>
                <input id="CCNumber" className="paymentBox"
                    type="text"
                    placeholder="1234567891234"
                    value={creditCard}
                    onChange={(event) => setCreditCard(event.target.value)}
                />

                <label> Expiration Date</label>
                <input id="expirationDate" className="paymentBox"
                    type="text"
                    placeholder="MM/YY"
                    value={creditCardExpirationDate}
                    onChange={(event) => setCreditCardExpirationDate(event.target.value)}
                />

                <label> CVC </label>
                <input id="cvc" className="paymentBox"
                    type="text"
                    placeholder="0000"
                    value={creditCardCVC}
                    onChange={(event) => setCreditCardCVC(event.target.value)}
                />
                <button id="paymentButton" type="submit"> Review Details </button>
                

            </form>
        </section>
    )
}

export default PaymentInfo
