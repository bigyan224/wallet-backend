import express from "express";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import { initDB } from "./config/db.js";

import transactionsRoute from "./routes/transactionsroute.js"
dotenv.config();
const app = express();

app.use(ratelimiter)
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/test",(req,res)=>{
    res.send("its working");
})


app.use("/api/transactions",transactionsRoute)

initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running at PORT:", PORT);
    })

})