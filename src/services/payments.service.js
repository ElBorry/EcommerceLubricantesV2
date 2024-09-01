// src/services/payments.service.js

import stripe from '../utils/stripe/stripe.util.js';

const checkoutService = async ({ user_id, amount }) => {
  try {
    // Crear un pago
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe usa centavos
      currency: 'usd', // Ajusta la moneda según tus necesidades
      metadata: { integration_check: 'accept_a_payment' },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    throw new Error(`Error creating payment: ${error.message}`);
  }
};

export default checkoutService;
