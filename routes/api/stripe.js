/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51HbFZVEc6kTkdvDzDFHKqPO91VzC07jPuD73jTODWzzcpq2WVjYfjwu1lM4hMlo3WpNnv5ZdpsI2h0RrC40Q9wBC00sMmo8exT');
let cus = 'cus_IVsu1Saa0ADM0Q'; // customer.id
router.post('/create-customer', async (req, res) => {
    // const customer = await stripe.customers.create();
    // pi_1HuZueEc6kTkdvDzTr1tuHb7
    const intent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'aud',
        // customer: 'pi_1HuZueEc6kTkdvDzTr1tuHb7',
        customer: 'cus_IVsu1Saa0ADM0Q',
    });
    res.json({ 
        clientSecret: intent.client_secret,
        intent,
    });
    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items: [
    //         {
    //             price_data: {
    //                 currency: 'usd',
    //                 product_data: {
    //                     name: 'T-shirt',
    //                 },
    //                 unit_amount: 2000,
    //             },
    //             quantity: 1,
    //         },
    //     ],
    //     mode: 'payment',
    //     success_url: 'http://localhost:3000/success.html',
    //     cancel_url: 'https://example.com/cancel',
    // });
    // res.json({ id: session.id });
});
router.post('/pay', async (req, res) => {
    const paymentMethods = await stripe.paymentMethods.list({
        customer: 'cus_IVsu1Saa0ADM0Q',
        type: 'card',
    });
    // console.log(paymentMethods);
    // res.json(paymentMethods.data[0].id);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100,
            currency: 'aud',
            customer: 'cus_IVsu1Saa0ADM0Q',
            payment_method: paymentMethods.data[0].id,
            off_session: true,
            confirm: true,
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntent,
        });
    } catch (err) {
        // Error code will be authentication_required if authentication is needed
        console.log('Error code is: ', err.code);
        const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
        console.log('PI retrieved: ', paymentIntentRetrieved.id);
    }
});
router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success.html',
        cancel_url: 'https://example.com/cancel',
    });
    res.json({ id: session.id });
});


module.exports = router;