import mongoose from "mongoose";
import Product from "../models/productModel.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error in fetching products: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create product
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image)
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });

  const newProduct = new Product({ name, price, image });

  try {
    await newProduct.save();
    return res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(`Error in creating product: ${error.message}`);
    return res
      .status(400)
      .json({ success: false, message: "Failed to create product" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "invalid product ID" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(`Error updating product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(`Error in deleting product: ${error.message}`);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
