import { json } from 'express';
import Car from '../models/Car.js';
import Record from '../models/Record.js'

export const trackCar = async(req,res)=>{
    try {
        const {Status,CarNo} = req.body
        console.log(req.body)
        if(!Status || !CarNo){
            return res.status(400).json({data:"Status and CarNo are required feilds", error:true})
        }

        let availableStatus = ['in','out']
        if(!availableStatus.includes(Status)){
            return res.status(400).json({data:"invalid status, valid status values are: in, out"})
        }
        let isCarRegistered = await Car.findOne({NoPlate:CarNo})
        if(!isCarRegistered){
            return res.status(400).json({data:"car with this number plate is not registered.", error:true})
        }
        if(Status=='in'){
            // find is car already their(inside slot)
            let isCarAlreadyIn = await Record.find({CarNo})
            console.log(isCarAlreadyIn)
            // check cars last record
            if(isCarAlreadyIn[isCarAlreadyIn.length-1]?.Status=='in' || isCarAlreadyIn.length!==0){
                return res.status(400).json({data:"car with this number plate is already inside",error:true})
            }
            let newRecord = new Record({
                CarNo,
                Status
            })

            let recordResp = await newRecord.save()

            return res.status(201).json({data:recordResp,error:false})
        }

        // Status == out
        // find is car already their(inside slot)
        let isCarAlreadyIn = await Record.find({CarNo})
        // check cars last record
        if(isCarAlreadyIn[isCarAlreadyIn.length-1]?.Status=='out' || isCarAlreadyIn.length == 0){
            return res.status(400).json({data:"car with this number plate is already out side or never entered in a lot", error:true})
        }
        let newRecord = new Record({
            CarNo,
            Status
        })

        let recordResp = await newRecord.save()

        return res.status(201).json({data:recordResp,error:false})
    } catch (error) {
        console.log('addRecord error: ', error)
        return res.status(500).json({data:'addRecord error: check console ',error:true})
    }
}
