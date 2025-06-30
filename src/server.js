import express from "express";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import { initDB } from "./config/db.js";

import transactionsRoute from "./routes/transactionsroute.js"
import job from "./config/cron.js";

dotenv.config();
const app = express();

if(process.env.NODE_ENV === "production") job.start();

app.use(ratelimiter)
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/test",(req,res)=>{
    res.status(200.).json({status:"ok"});
})


app.use("/api/transactions",transactionsRoute)

initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running at PORT:", PORT);
    })

})