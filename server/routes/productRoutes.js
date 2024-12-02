import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

// Get all products | Create Product
router.route("/").get(getAllProducts).post(createProduct);

// Update product | Delete product
router.route("/:id").patch(updateProduct).delete(deleteProduct);

export default router;
