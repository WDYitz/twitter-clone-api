import cors from "cors";
import express from "express";
import helmet from "helmet";
import { router } from "./routes/router";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use(router);

export default app;
