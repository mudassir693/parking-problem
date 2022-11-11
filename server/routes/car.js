import express from 'express'
import { addCar, getCarByCredientials } from '../controllers/carController.js'

const router = express.Router()

router
    .post('/registerCar',addCar)
    .get('/getCarByCred/',getCarByCredientials)
    
export default router