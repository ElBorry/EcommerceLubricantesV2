import { PaymentSessionModel } from '../data/mongo/models/paymentSession.model.js';

// Función para guardar una sesión de pago en la base de datos
const saveSession = async (session) => {
  try {
    const savedSession = await PaymentSessionModel.create(session);
    return savedSession;
  } catch (error) {
    throw new Error('Error saving payment session: ' + error.message);
  }
};

export default {
  saveSession,
};
