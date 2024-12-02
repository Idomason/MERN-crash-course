import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const __dirname = path.resolve();

// MIDDLEWARES
app.use(express.json()); // allows us to accept JSON data in req.body

// ENDPOINTS OR ROUTES
app.use("/api/v1/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server started at port localhost:${port}`);
});

// 4pDWW0QJ0Pvu78Kn
