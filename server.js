import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import doctorRoute from "./routes/doctorsRoute.js";
import MedRouter from "./routes/MedRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// Import database config
import "./config/dbConfig.js";

// Initialize express app
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Static files
app.use("/images", express.static("uploads"));

// Routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/food", MedRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/drug", MedRouter);
// Removed pharmaRouter route since it's causing issues

// Production setup
if (process.env.NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use("/", express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

// Server setup
const port = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
