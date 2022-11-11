import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    NoPlate:{
        type:String,
        required:true
    },
    Owner:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    RegistrationDate:{
        type:Date
    },
    ExpirationDate:{
        type:Date
    }
},{
    timestamps:true
})

export default mongoose.model('cars',carSchema)