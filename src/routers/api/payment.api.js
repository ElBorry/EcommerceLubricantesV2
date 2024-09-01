// src/routers/api/payment.api.js

import express from 'express';
import checkoutController from '../../controllers/payments.controller.js';

const router = express.Router();

// Ruta para el proceso de checkout
router.post('/checkout', checkoutController);

export default router;
