// local Car Blueprint
import Car from '../models/Car.js'

export const addCar = async(req, res)=>{
    try {
        console.log("hello")
        const {PhoneNumber,Owner,NoPlate } = req.body
        // console.log(!PhoneNumber || !Owner || !NoPlate )
        let RegistrationDate = new Date()
        console.log(RegistrationDate.toDateString())
        let ExpirationDate = new Date(RegistrationDate.setMonth(RegistrationDate.getMonth()+1))

        console.log(ExpirationDate.toDateString())
        // return

        if(!PhoneNumber || !Owner || !NoPlate){
            return res.status(404).json({data:"kindly fill the required feilds", error:true})
        }
        let isSlotAvailable =await Car.find()
        if(isSlotAvailable.length>=100){
            return res.status(404).json({data:"Sorry, No slots available yet.",error:true})
        }
        let isCarAlreadyThere = await Car.findOne({NoPlate})
        if(isCarAlreadyThere){
            return res.status(404).json({data:"car with this No plate is already Registered",error:true})
        }

        let registerCar = new Car({PhoneNumber,Owner,NoPlate,RegistrationDate:new Date(),ExpirationDate})
        let resp = await registerCar.save()
        console.log(registerCar)
        return res.status(201).json({data:resp, error:false})

    } catch (error) {
        console.log('addCar error: ', error)
        return res.status(500).json({data:'addCar error: check console', error:true})
    }
}

export const getCarByCredientials = async(req,res)=>{
    try {
        const {cred,type} = req.query
        if(!type || !cred){
            return res.status(404).json({data:"creditianls required", error:true})
        }
        if(type=='NoPlate'){
            let getAllFromCarNo = await Car.find({NoPlate:{$regex: cred}})
            return res.status(200).json({data:getAllFromCarNo, error:false})
        }
        if(type=='Owner'){
            let getAllFromOwner = await Car.find({Owner:{$regex: cred}})
            return res.status(200).json({data:getAllFromOwner, error:false})
        }
        if(type=='PhoneNumber'){
            let getAllFromPhone = await Car.find({PhoneNumber:{$regex: cred}})
            return res.status(200).json({data:getAllFromPhone, error:true})
        }
        
    } catch (error) {
        console.log('getCarByCredientials error: ',error)
        return res.status(500).json({data:'getCarByCredientials error: check console',error:true})
    }
}