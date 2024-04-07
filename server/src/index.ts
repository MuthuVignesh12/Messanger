// src/index.js
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import compression from "compression";
import cors from "cors";
import router from "./routes";
import connectDataBase from "./db/connect";


const app: Express = express();
const uri = process.env.MONGODB_URL || '';
const port = process.env.PORT || 3000;

// Cors Credentials
app.use(cors({
  credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


// Routes
app.use('/api', router);


const server = http.createServer(app);
server.listen(port, () => {
  // DB Connect
  connectDataBase(uri);

  console.log(`[server]: Server is running at http://localhost:${port}`);
});