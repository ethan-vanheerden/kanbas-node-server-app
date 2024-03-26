import express from "express";
import "dotenv/config";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kanbas?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.1";

mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2],
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json());

Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);
