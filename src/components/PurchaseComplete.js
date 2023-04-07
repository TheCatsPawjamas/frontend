import { useState } from "react"

const PurchaseComplete = (props) => {
    const { setIsLoggedIn, currentUser } = props
    const { confirmation, setConfirmation } = useState("")
    const { orderId, setOrderId } = useState("")
    const { message, setMessage } = useState("")

    const sendMessage = () => {
        setMessage("Your order is complete, please come and pick your new furry friend from 1234 Purrr Ln, Meow Paws 123480")
    }

    return (
        <section>
            <div>
                <p>{confirmation}</p>
                <p>{message}</p>
                <p>Order ID: {orderId}</p>
            </div>
        </section>
    )
}