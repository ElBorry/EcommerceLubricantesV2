// src/controllers/payments.controller.js

import checkoutService from '../services/payments.service.js';

const checkoutController = async (req, res, next) => {
  try {
    console.log("Checkout controller called");

    const { user_id } = req.session;
    const { amount } = req.body; // Recibir la cantidad desde el cuerpo de la solicitud

    if (!user_id) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    const response = await checkoutService({ user_id, amount });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

export default checkoutController;
