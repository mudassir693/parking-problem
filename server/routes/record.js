import express from 'express'
import { trackCar } from '../controllers/recordController.js'

const router = express.Router()
router
    .post('/trackCar',trackCar)
export default router