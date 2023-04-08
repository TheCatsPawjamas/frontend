import { useState, useEffect} from "react"
import { Link } from "react-router-dom"
// import "./PaymentInfo.css"
import React from "react";

const PaymentInfo = (props) => {
    const { setIsLoggedIn, currentUser, cartItems } = props
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
            const result = await response.json();
            console.log(result)
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

// import {
//     MDBBtn,
//     MDBCard,
//     MDBCardBody,
//     MDBCardImage,
//     MDBCol,
//     MDBContainer,
//     MDBIcon,
//     MDBInput,
//     MDBRow,
//     MDBTypography,
// } from "mdb-react-ui-kit";


//     // export default function Basic() {
//         return (

// <section className="h-100 h-custom" style={{ backgroundColor: "#B2A3B5" }}>
//   <MDBContainer className="py-5 h-100">
//     <MDBRow className="justify-content-center align-items-center h-100">
//       <MDBCol>
//         <MDBCard>
//           <MDBCardBody className="p-4">
//             <MDBRow>
//               <MDBCol lg="7">
//                 <MDBTypography tag="h5">
//                   <a href="/cats" className="text-body">
//                     <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
//                     shopping
//                   </a>
//                 </MDBTypography>

//                 <hr />

//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <div>
//                     <p className="mb-1">Shopping cart</p>
//                     {/* <p className="mb-0">You have 4 items in your cart</p> */}
//                   </div>
//                   <div>
//                     <p>
//                       <span className="text-muted">Sort by:</span>
//                       <a href="#!" className="text-body">
//                         price
//                         <MDBIcon fas icon="angle-down mt-1" />
//                       </a>
//                     </p>
//                   </div>
//                 </div>

//                 <MDBCard className="mb-3">
//                   <MDBCardBody>
//                     <div className="d-flex justify-content-between">
//                       <div className="d-flex flex-row align-items-center">
//                         <div>
//                           <MDBCardImage
//                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
//                             fluid className="rounded-3" style={{ width: "65px" }}
//                             alt="Shopping item" />
//                         </div>
//                         <div className="ms-3">
//                           <MDBTypography tag="h5">
//                            {/* cartItem={cartItems} */}
//                           </MDBTypography>
//                           <p className="small mb-0">Detail Placeholder</p>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center">
//                         <div style={{ width: "50px" }}>
//                           <MDBTypography tag="h5" className="fw-normal mb-0">
//                             2
//                           </MDBTypography>
//                         </div>
//                         <div style={{ width: "80px" }}>
//                           <MDBTypography tag="h5" className="mb-0">
//                             Price Placeholder
//                           </MDBTypography>
//                         </div>
//                         <a href="#!" style={{ color: "#cecece" }}>
//                           <MDBIcon fas icon="trash-alt" />
//                         </a>
//                       </div>
//                     </div>
//                   </MDBCardBody>
//                 </MDBCard>

//                 <MDBCard className="mb-3">
//                   <MDBCardBody>
//                     <div className="d-flex justify-content-between">
//                       <div className="d-flex flex-row align-items-center">
//                         <div>
//                           <MDBCardImage
//                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
//                             fluid className="rounded-3" style={{ width: "65px" }}
//                             alt="Shopping item" />
//                         </div>
//                         <div className="ms-3">
//                           <MDBTypography tag="h5">
//                            Item Placeholder
//                           </MDBTypography>
//                           <p className="small mb-0">Description Placeholder</p>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center">
//                         <div style={{ width: "50px" }}>
//                           <MDBTypography tag="h5" className="fw-normal mb-0">
//                             2
//                           </MDBTypography>
//                         </div>
//                         <div style={{ width: "80px" }}>
//                           <MDBTypography tag="h5" className="mb-0">
//                             Price Placeholder
//                           </MDBTypography>
//                         </div>
//                         <a href="#!" style={{ color: "#cecece" }}>
//                           <MDBIcon fas icon="trash-alt" />
//                         </a>
//                       </div>
//                     </div>
//                   </MDBCardBody>
//                 </MDBCard>

//                 <MDBCard className="mb-3">
//                   <MDBCardBody>
//                     <div className="d-flex justify-content-between">
//                       <div className="d-flex flex-row align-items-center">
//                         <div>
//                           <MDBCardImage
//                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
//                             fluid className="rounded-3" style={{ width: "65px" }}
//                             alt="Shopping item" />
//                         </div>
//                         <div className="ms-3">
//                           <MDBTypography tag="h5">
//                             Item Placeholder
//                           </MDBTypography>
//                           <p className="small mb-0"> Description holder</p>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center">
//                         <div style={{ width: "50px" }}>
//                           <MDBTypography tag="h5" className="fw-normal mb-0">
//                             Q Placeholder
//                           </MDBTypography>
//                         </div>
//                         <div style={{ width: "80px" }}>
//                           <MDBTypography tag="h5" className="mb-0">
//                             Price placeholder
//                           </MDBTypography>
//                         </div>
//                         <a href="#!" style={{ color: "#cecece" }}>
//                           <MDBIcon fas icon="trash-alt" />
//                         </a>
//                       </div>
//                     </div>
//                   </MDBCardBody>
//                 </MDBCard>

//                 <MDBCard className="mb-3">
//                   <MDBCardBody>
//                     <div className="d-flex justify-content-between">
//                       <div className="d-flex flex-row align-items-center">
//                         <div>
//                           <MDBCardImage
//                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
//                             fluid className="rounded-3" style={{ width: "65px" }}
//                             alt="Shopping item" />
//                         </div>
//                         <div className="ms-3">
//                           <MDBTypography tag="h5">
//                             MacBook Pro
//                           </MDBTypography>
//                           <p className="small mb-0">1TB, Graphite</p>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center">
//                         <div style={{ width: "50px" }}>
//                           <MDBTypography tag="h5" className="fw-normal mb-0">
//                             1
//                           </MDBTypography>
//                         </div>
//                         <div style={{ width: "80px" }}>
//                           <MDBTypography tag="h5" className="mb-0">
//                             $1799
//                           </MDBTypography>
//                         </div>
//                         <a href="#!" style={{ color: "#cecece" }}>
//                           <MDBIcon fas icon="trash-alt" />
//                         </a>
//                       </div>
//                     </div>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>

//               <MDBCol lg="5">
//                 <MDBCard className="bg-primary text-white rounded-3">
//                   <MDBCardBody>
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                       <MDBTypography tag="h5" className="mb-0">
//                         Card details
//                       </MDBTypography>
//                       <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                         fluid className="rounded-3" style={{ width: "45px" }} alt="Avatar" />
//                     </div>

//                     <p className="small">Card type</p>
//                     <a href="#!" type="submit" className="text-white">
//                       <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
//                     </a>
//                     <a href="#!" type="submit" className="text-white">
//                       <MDBIcon fab icon="cc-visa fa-2x me-2" />
//                     </a>
//                     <a href="#!" type="submit" className="text-white">
//                       <MDBIcon fab icon="cc-amex fa-2x me-2" />
//                     </a>
//                     <a href="#!" type="submit" className="text-white">
//                       <MDBIcon fab icon="cc-paypal fa-2x me-2" />
//                     </a>

//                     <form className="mt-4">
//                       <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
//                         placeholder="Cardholder's Name" contrast />

//                       <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
//                         minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

//                       <MDBRow className="mb-4">
//                         <MDBCol md="6">
//                           <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
//                             minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
//                         </MDBCol>
//                         <MDBCol md="6">
//                           <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
//                             maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
//                         </MDBCol>
//                       </MDBRow>
//                     </form>

//                     <hr />

//                     <div className="d-flex justify-content-between">
//                       <p className="mb-2">Subtotal</p>
//                       <p className="mb-2">$4798.00</p>
//                     </div>

//                     <div className="d-flex justify-content-between">
//                       <p className="mb-2">Shipping</p>
//                       <p className="mb-2">$20.00</p>
//                     </div>

//                     <div className="d-flex justify-content-between">
//                       <p className="mb-2">Total(Incl. taxes)</p>
//                       <p className="mb-2">$4818.00</p>
//                     </div>

//                     <MDBBtn color="info" block size="lg">
//                       <div className="d-flex justify-content-between">
//                         <span>$4818.00</span>
//                         <span>
//                           Checkout{" "}
//                           <i className="fas fa-long-arrow-alt-right ms-2"></i>
//                         </span>
//                       </div>
//                     </MDBBtn>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>
//             </MDBRow>
//           </MDBCardBody>
//         </MDBCard>
//       </MDBCol>
//     </MDBRow>
//   </MDBContainer>
// </section>
// );
// }
    
