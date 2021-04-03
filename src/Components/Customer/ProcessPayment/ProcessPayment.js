import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IZvNKHDSl50xby0cP5yVQHwAEeIBy08YeX2w5NT49hHPWpGWvDxqrN8rTsk9lcb7PyI8ndK119TpmVD7xKHMctz00XWZG1acr');

const ProcessPayment = ({handlePayment}) => {
    return (

        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment} ></SimpleCardForm>
            {/* <SplitCardForm></SplitCardForm> */}
        </Elements>


    );
};

export default ProcessPayment;