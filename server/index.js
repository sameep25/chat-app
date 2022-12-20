import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT || 8000;
const URL = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`app is running successfully on port : ${PORT}`);
});

Connection(URL);

app.get("/", (req, res) => {
  res.send(`chat-app-server`);
});

app.use("/api/user", userRoutes);

// const user = {name:"sameep" ,id:"1"} ;
// app.get("/users" ,(req ,res) =>{
//     res.send(user) ;
// })
