const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      purchase: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },
          quantity: {
            type: Number,
            default: 1
          }
        }
      ],
      totalAmount: {
        type: Number
      },
      status: {
        type: String,
        enum: ["en proceso", "enviado", "recibido"]
      }
    },
    { 
        //este segundo objeto agrega dos propiedades extras: "createdAt" and "updateAt"
        timestamps: true 
    }
  );
  
  const Order = model("Order", orderSchema);
  
  module.exports = Order;