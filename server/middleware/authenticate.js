import { signupmodel } from "../schema/schema.js";
import jwt from 'jsonwebtoken'

const SECRET_KEY = "Abdullah Project";
export const authenticate=async (req,res,next)=>{

    try{
        const token=req.headers.authorization
        const verifyToken=jwt.verify(token,SECRET_KEY)
        // console.log(verifyToken)
        const rootUser=await signupmodel.findOne({_id:verifyToken._id})

        // console.log(rootUser)
        if(!rootUser){
            throw new Error('user not found')
        }

        req.token=token
        req.rootUser=rootUser,
        req.userId=rootUser._id
        // console.log(_id)
        next()
        // res.status(201).json({
        //     messege:"user",
        //     rootUser
        // })
    }
    catch(err){
        res.status(401).json({
            message:"Unauthorized no token provide"
        })


    }
}


