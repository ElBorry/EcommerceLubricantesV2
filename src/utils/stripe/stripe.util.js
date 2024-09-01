import Stripe from 'stripe';
import variablesEnviroment from '../env/env.util.js';

const stripe = Stripe(variablesEnviroment.STRIPE_SECRET_KEY);

export default stripe;