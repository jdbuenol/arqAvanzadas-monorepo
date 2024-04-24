import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application } from "express";
import { createServer } from "http";
import helmet from "helmet";
import router from "./router";

const whitelist = ["/"];

const options: cors.CorsOptions = {
  origin: whitelist,
};
const port = process.env.PORT || 9000;
const env = process.env.NODE_ENV || "production";

const app: Application = express();

app.use(express.json({ limit: "20kb" }));
app.use(helmet());

if (env === "production") {
  app.use(cors(options));
}

if (env === "development") {
  app.use(cors());
}

app.disable("x-powered-by");

app.use("/api", router);

createServer(app).listen({ port }, () => {
  console.log(`Auth service started at port ${port}`);
});
