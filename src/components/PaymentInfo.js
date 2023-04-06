import { useState, useEffect} from "react"

const PaymentInfo = (props) => {
    const { setIsLoggedIn, currentUser } = props
    const [ creditCardName, setCreditCardName ] = useState("")
    const [ creditCard, setCreditCard ] = useState("")
    const [ creditCardExpirationDate, setCreditCardExpirationDate ] = useState("")
    const [ creditCardCVC, setCreditCardCVC ] = useState("")

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

    useEffect ( () => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            Payment()
        } else {
            setIsLoggedIn(false)
            console.log("No token exist")
        }
    }, []);
    
    return (
        <section> 
            <h3> To continue, please provide your payment information below</h3>

            <form onSubmit={Payment}> 
                <input
                    type="text"
                    placeholder="Name On Card"
                    value={creditCardName}
                    onChange={(event) => setCreditCardName(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Credit Card Number"
                    value={creditCard}
                    onChange={(event) => setCreditCard(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Expiration Date"
                    value={creditCardExpirationDate}
                    onChange={(event) => setCreditCardExpirationDate(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="CVC#"
                    value={creditCardCVC}
                    onChange={(event) => setCreditCardCVC(event.target.value)}
                />
                <button className="paymentButton" type="submit"> Checkout </button>
            </form>
        </section>
    )
}

export default PaymentInfo
