import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
    },
    image: {
      type: String,
      required: [true, "Product must have an image"],
    },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);
export default Product;
