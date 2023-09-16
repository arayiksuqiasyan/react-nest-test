import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51NqC1GEv8diyRyzXl5DGJw2RoO9vgsyE1GLJMAQNq4ZXTsM3SHFeUNlDilUJebIIPbUpM1IyGHeCVBwQHR9rc70x00ZEbBkspy"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = (props) => {

    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    )
}

export default StripeContainer
