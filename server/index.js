import express from express ;
import cors  from cors ;

const app = express() ;
app.use(cors()) ;

PORT = process.env.PORT || 8000 ;
