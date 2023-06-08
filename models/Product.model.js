const { Schema, model } = require("mongoose");

const productSchema = Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
    },
    createdBy: { 
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  });
  
  const Product = model('Product', productSchema);
  
  module.exports = Product;