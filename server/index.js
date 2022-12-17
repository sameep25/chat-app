import express from "express" ;
import cors  from "cors" ;
import dotenv from "dotenv" ;

const app = express() ;
app.use(cors()) ;

dotenv.config() ;
const PORT = process.env.PORT || 8000 ;

app.listen(PORT ,()=>{
    console.log(`app is running successfully on port : ${PORT}`);
})

app.get('/' ,(req,res)=>{
    res.send(`chat-app-server`) ;
})