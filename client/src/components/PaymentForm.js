import React, {useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

import {payment} from "../services/client/home-service";
import {useNavigate} from "react-router-dom";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#606060",
            color: "#000000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {color: "#fce883"},
            "::placeholder": {color: "#a6a6a6"}
        },
        invalid: {
            iconColor: "#ec6565",
            color: "#ec6565"
        }
    }
}


const PaymentForm = (props) => {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (error) {
            console.log('Error')
        } else {
            try {
                const {id} = paymentMethod
                const response = await payment({amount: 1000, id})
                if (response.success) {
                    setSuccess(true)
                }
            } catch (e) {
                console.log('Error')
            }
        }

    }

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className={'FormRow'}>
                            <CardElement options={CARD_OPTIONS}/>
                        </div>
                    </fieldset>
                    <button>pay</button>
                </form>
                :
                <div className={'success-message'}>
                    <h2>
                        You just bought a Pikachu congrats this is
                        the best decision of you're life
                    </h2>
                </div>
            }
        </>
    )
}

export default PaymentForm
