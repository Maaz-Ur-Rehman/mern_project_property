import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connection from "./database/db.js";
import Routes from "./routes/routes.js";
import path from "path";
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
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, './client/build')));
app.use("/", Routes);

app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
const port = 7000;
app.listen(port, () => console.log(`server is running on ${port} port`));
