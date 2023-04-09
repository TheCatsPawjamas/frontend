import React from "react"
import { useState } from "react"

const PurchaseComplete = (props) => {
    const { setIsLoggedIn, currentUser, cartItems, orderId } = props
    const [ confirmation, setConfirmation ] = useState("")
    const [ message, setMessage ] = useState("")

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
        const result = await response.json();
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

    function sendMessage() {
        setMessage("Your order is complete! Thank you for choosing Cat Pawjamas, please come and pickup your new furry friend from 1234 Purrrfect Lane Meowville, Milwaukitty 051421. See you soon!");
    }

    function createConfirmationNumber(){
        const confirmationNumber = Math.random().toString().substr(2,10);
        setConfirmation(confirmationNumber)
    }

    function orderDetails(){
        sendMessage();
        createConfirmationNumber()
    }
// fetch request 2: 
    return (
        <section id="purchaseCompleteSection">
            <div>
                <h2> {currentUser.username}, Review Order Details </h2>
                {
                    cartItems.filter(item => item.creditCard === currentUser.creditCard).map((thing) => (
                        <div key={thing}>
                            <p>{thing.creditCard}</p>
                            <p> Name On Credit Card: {thing.creditCardName}</p>
                            <p> Credit Card Number: {thing.creditCard}</p>
                        </div>
                    ))
                } 

                {/* {!cartItems.length && <div> Your Cart Is Empty </div>} */}
                 
                {
                    cartItems.filter(item => item.creditCard === currentUser.creditCard).map((product) => {
                        return (
                            <section key={product.id}>
                                <p> Cart: {product.name} </p>
                                <p> </p>

                                <div>
                                {/* Display only the current user's credit card info */}
                                    {product.creditCard === currentUser.creditCard && <p>{product.creditCard}</p>}
                                </div>
                            </section>
                            ) 
                        })
                }
            </div>
        </section>

    )
}

    
export default PurchaseComplete;

{/* //     return (
//         <section id="purchaseCompleteSection"> 
//             <div>
//                 <h2> {currentUser.username}, Review Order Details </h2> */}
                // {
                //     cartItems.filter(item => item.creditCard === currentUser.creditCard).map((products) => (
                //         <div key={products.id}>
                //             {products.name}
                //         </div>
                // }
                //     )) => {
                //         return (
                //             <section>
                //                 <div key={products.id}></div>
                //             {/* How do i make it so it only shows the current users CC info  */}
                //                 <div> </div>
                //             </section>
                        
                //         )
                //     }) : <div> Your Cart Is Empty </div>  
                // }
                
//                 {/* orderId is not an array  */}
//                 /* {
//                     orderId ? orderId.map((products) => {
//                         return (
//                             <div key={products.id}></div>
//                         )
//                     }) : <div> Your Cart Is Empty </div>  
//                 } */}
                       
        
//                 <button onClick={CompleteOrder}> Order Details </button>
//                 {/* <p> {message} </p> */}
//                 <p> Confirmation Number: {confirmation} </p>
//                 {/* <p> {cartItems}</p> */}
//                 <p> orderId: {orderId}</p>
//             </div>
//         </section>
//     )
// }

// export default PurchaseComplete;

   {/* /* // .length ? null : <div>Your Cart Is Empty</div> */}
                {/* //  */

        //      
        //         {/* <p> {message} </p> */}
                // <p> Confirmation Number: {} </p>
        //         {/* <p> {cartItems}</p> */}
        //         <p> orderId: {}</p>
        //     </div>
        // </section> */} */}
                }

