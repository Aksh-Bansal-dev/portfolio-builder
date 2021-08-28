import express from "express";
import cors from "cors";
import "reflect-metadata";
import { createConnection } from "typeorm";

import authRoutes from "./routes/authRoutes";
require("dotenv").config();

createConnection()
  .then(async (_connection) => {
    // Middleware
    const app = express();
    app.use(
      cors({
        origin: process.env.CLIENT_URL,
      })
    );
    app.use(express.json());

    // Routes

    app.use("/auth", authRoutes);

    const port = process.env.PORT ? process.env.PORT : 5000;
    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch((err) => console.log(err));
