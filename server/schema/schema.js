import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const SECRET_KEY = "Abdullah Project";
const userschema = mongoose.Schema({
  property_type : String,
  city : String,
  location : String,
  area : String,
  priceFrom : String,
  priceTo : String,
  installment : String,
  possession : String,
  bedrooms : String,    
  bathrooms : String,
  kitchens : String,
  outdoor : [],
  interior : [],
  otherfeather : [],
  utilities : [],
  title : String,
  description : String,
  email : String,
  mobile : String,
  Landline : String,
  Image : String,
  video : String,
  pdf : String,
  status : String,
  ClientId:String,
  CompanyId:String,
  fields : []
})

export const user = mongoose.model('realEstate',userschema);

const companyschema = mongoose.Schema({
  companyname:String,
  description : String,
  userId:String,
  Image : String,
})

export const companyuser = mongoose.model('companyState',companyschema);



// export default user;



const signupSchema = mongoose.Schema({
  user:String,
  company_name : {
    type:String,
    required:[true,"Company name is required"]
  },
  email :{
    type: String,
    required:[true,"Email is required"]
  },

    password : {
      type:String,
      required:[true,"Password is required"]
    },
  
  status : String,
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ]
})

signupSchema.pre('save', async function(next){
  try{
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next()
  }
  catch(err){
    console.log('not hash password',err)
  }

})
signupSchema.methods.CreateJWT=async  function(){
    try{
      let token23=jwt.sign({_id:this._id},SECRET_KEY,{expiresIn:'1d'})

      this.tokens=this.tokens.concat({token:token23})
      await this.save()
      return token23
    }
    catch(err){

      console.log(err)
    }

}
export const signupmodel = mongoose.model('signup',signupSchema); 