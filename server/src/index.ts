import express, {Request, Response, Router} from 'express';
import dotenv from 'dotenv';
import {routes} from './routes/routeIndex';
import mongoose, { connect } from 'mongoose';

const app = express();

//App settings
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const port = process.env.port || 3000;

//Load configuration
dotenv.config();

//Connection to MongoDB
if(process.env.MONGO_URI == null){
    console.log("MongoDB env variable not set, check .env file!")
}
else{
    mongoose.connect(process.env.MONGO_URI).catch(error => console.log(error));;
    console.log("Connected to MongoDB");
}

//Routes
app.use('/', routes)

//Server start
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})