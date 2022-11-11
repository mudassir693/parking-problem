import mongoose from 'mongoose'

const recordSchema = new mongoose.Schema({
    CarNo:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        enum:['in','out'],
        required:true
    },
},{
    timestamps:true
})

export default mongoose.model('records', recordSchema)