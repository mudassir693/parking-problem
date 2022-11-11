// dot env setup
import dotenv from 'dotenv';

dotenv.config()

// modules
import express from 'express'
import cors from 'cors'

// local modules
import connectDB from './config/DB_config.js'

// connecting DB
connectDB()

// importing routes
import carRoute from './routes/car.js'
import recordRoute from './routes/record.js'


// server/app initialize
let app = express();
app.use(express.json())

// cors
app.use(cors())
// test route
app.get('/',(req,res)=>{
    try {
        return res.status(200).json({data:"server runs fine.", error:false})
    } catch (error) {
        console.log('test route error: ', error)
        return res.status(500).json({data:"test route error: check console", error:true})
    }
})


// creating routes
app.use('/api/cars',carRoute)
app.use('/api/records',recordRoute)


// listening
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})