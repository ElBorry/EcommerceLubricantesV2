import { Schema, model, Types } from 'mongoose';

const collection = 'payment_sessions';

const schema = new Schema(
  {
    id: {
      type: String, // ID de la sesión en Stripe
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    amount_total: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    user_id: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

export const PaymentSessionModel = model(collection, schema);
