import express from "express";
import cors from "cors";
import "reflect-metadata";
import fileUpload from "express-fileupload";
import { createConnection } from "typeorm";

import { initialTemplateData } from "./utils/initialTemplateData";
import authRoutes from "./routes/authRoutes";
import templateRoutes from "./routes/templateRoutes";
import userRoutes from "./routes/userRoutes";
import webRoutes from "./routes/webRoutes";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

createConnection()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(async (_connection) => {
    // Middleware
    const app = express();
    app.use(
      cors({
        origin: process.env.CLIENT_URL,
      })
    );
    app.use(express.json());
    app.use(fileUpload());

    // Serve static images
    app.use("/images", express.static("images"));

    // Serving static ejs
    app.set("view engine", "ejs");
    app.use("/web", webRoutes);

    // Initial DB data
    initialTemplateData();

    // Routes
    app.use("/user", userRoutes);
    app.use("/auth", authRoutes);
    app.use("/template", templateRoutes);

    const port = process.env.PORT ? process.env.PORT : 5000;
    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch((err) => console.log(err));
