const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const BookHouseCartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);

const BookHouseCartItem = mongoose.model(
  "BookHouseCartItem",
  BookHouseCartItemSchema
);

const BookHouseOrderSchema = new mongoose.Schema(
  {
    products: [BookHouseCartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    bookhouseusername: { type: String },
    bookhouseuseremail: { type: String }
  },
  { timestamps: true }
);

const BookHouseOrder = mongoose.model("BookHouseOrder", BookHouseOrderSchema);

module.exports = { BookHouseOrder, BookHouseCartItem };
