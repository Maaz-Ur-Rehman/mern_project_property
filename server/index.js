import express from "express";
import dotenv from "dotenv"; // Removed unused { config }
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connection from "./database/db.js";
import Routes from "./routes/routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

const username = process.env.DB_user;
const userpassword = process.env.DB_password;
connection(username, userpassword);
app.use(cookieParser())
app.use(cors());
app.use("/", Routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from "path"; // Import the path module

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/build/index.html"),()=>{
        res.status(500).send(err)
    })
});

const port = 7000;
app.listen(port, () => console.log(`server is running on ${port} port`));
