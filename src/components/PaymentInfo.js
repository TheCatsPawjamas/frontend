import { useState, useEffect} from "react"
import { Link } from "react-router-dom"
import "./PaymentInfo.css"

const PaymentInfo = (props) => {
    const { setIsLoggedIn, currentUser } = props
    const [ creditCardName, setCreditCardName ] = useState("")
    const [ creditCard, setCreditCard ] = useState("")
    const [ creditCardExpirationDate, setCreditCardExpirationDate ] = useState("")
    const [ creditCardCVC, setCreditCardCVC ] = useState("")

    useEffect ( () => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            Payment()
        } else {
            setIsLoggedIn(false)
            console.log("No token exist")
        }
    }, []);

    async function Payment () {
        // event.preventDefault();
        try {
            const response = await fetch(`http://localhost:1337/api/orders/${currentUser.id}`, {
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
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    
    // do we need another fetch request that complete the order
    async function CompleteOrder () {
        try {
            const response = await fetch(`http://localhost:1337/api/orders/purchaseComplete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

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
                <Link to="/purchasecomplete"><button id="paymentButton" type="submit"> Submit Order </button> </Link>
            </form>
        </section>
    )
}

export default PaymentInfo
