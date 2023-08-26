import { user } from "../schema/schema.js";
import { signupmodel } from "../schema/schema.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { companyuser } from "../schema/schema.js";
// app.use(cookieParser)
// const bcrypt = require("bcryptjs");
import bcrypt from "bcryptjs";

// ########################################## Form Controller Start ##########################################

export const controllerform = async (req, res) => {

  const {
    ClientId,
    property_type,
    city,
    location,
    area,
    priceFrom,
    priceTo,
    installment,
    possession,
    bedrooms,
    bathrooms,
    kitchens,
    outdoor,
    interior,
    otherfeather,
    utilities,
    title,
    description,
    email,
    mobile,
    Landline,
    fields,
    CompanyId
  } = req.body;
  const status = "pending";


  console.log(fields,"fields")
  // const Image = req.files['propertyImg'][0].filename;
  // const url = req.protocol + "://" + req.get("host");
  // console.log(url, "url");
  const Image =
    req.files && req.files["propertyImg"]
      ? req.files["propertyImg"][0].filename
      : undefined;
  const video =
    req.files && req.files["propertyVideo"]
      ? req.files["propertyVideo"][0].filename
      : undefined;
  const pdf =
    req.files && req.files["propertypdf"]
      ? req.files["propertypdf"][0].filename
      : undefined;
  console.log(req.body.otherfeather);
  const inte = JSON.parse(req.body.interior);
  const out = JSON.parse(req.body.outdoor);
  const other = JSON.parse(req.body.otherfeather);
  const util = JSON.parse(req.body.utilities);

  const newuser = new user({
    ClientId,
    CompanyId,
    property_type,
    city,
    location,
    area,
    priceFrom,
    priceTo,
    installment,
    possession,
    bedrooms,
    bathrooms,
    kitchens,
    outdoor :   out,
    interior : inte,
    otherfeather : other,
    utilities : util,
    title,
    description,
    email,
    mobile,
    Landline,
    Image,
    video,
    pdf,
    status,
    fields
  });
  console.log(newuser);

  try {
    await newuser.save();
    return res.status(201).json({ newuser, uu: "ssss" });
  } catch (error) {
    return res.status(409).json({ message: error.message, error: "error" });
  }
};

// ########################################## Form Controller END ##########################################

export const controllerCompanyform = async (req, res) => {

  const {
    companyname,
    description,
    userId
  } = req.body;


  const Image =
    req.files && req.files["propertyImg"]
      ? req.files["propertyImg"][0].filename
      : undefined;

  const newcompanyuser = new companyuser({
    companyname,
    description,
    Image,
    userId
  });
  console.log(newcompanyuser);

  try {
    await newcompanyuser.save();
    return res.status(201).json({ newcompanyuser, uu: "ssss" });
  } catch (error) {
    return res.status(409).json({ message: error.message, error: "error" });
  }
};



export const controllerGetCompany= async (req,res)=>{

    try{
        const companyData=await companyuser.find()

        res.status(200).json({

          companyData
        })
    }
    catch(err){
      res.status(500).json({
        messege:err
      })
    }


}



// ########################################## SignUp Controller Start ##########################################

export const controllerSignup = async (req, res) => {
  const { companyName, email, password, confirmPassWord } = req.body;
  

  const status = "pending";
  const signupmodels = new signupmodel({
    user: "user",
    company_name: companyName,
    email: email,
    password: password,
    confirmPassWord: confirmPassWord,

    status,
  });
  try {
    const alreadyExist = await signupmodel.findOne({ email: email });

    if (alreadyExist) {
      throw Error("User Aready Exist !");
    }

    await signupmodels.save();

    return res.status(201).json({
      user: signupmodels,
      messege: "user Successful created",
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
// ########################################## SignUp Controller END ##########################################

// ########################################## SignIn Controller Start ##########################################

export const controllerSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await signupmodel.findOne({ email: email });

    if (user) {
      console.log(user.password,"user pass")
      console.log(password,"password")

      const comparePass =await bcrypt.compare(password, user.password);

      if (!comparePass) {
        res.json({
          messege: "credential error",
          status: 422, 
        });
      } else {
        const token = await user.CreateJWT();
        console.log(token);
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        const result = {
          user,
          token,
        };
        res.json({
          result,
          status:201
        });
      }
    } else {
      res.json({
        messege: "credential error",
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// ########################################## SignIn Controller END ##########################################
// ########################################## ValidUser Controller Start ##########################################

export const controllerValidUser = async (req, res) => {
  try {
    // console.log(req.userId,"done")
    const validUser = await signupmodel.findOne({ _id: req.userId });
    console.log(validUser, "valid user");
    res.status(201).json({
      status: 201,
      message: "verify user",
      validUser,
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      err,
    });
  }
};
// ########################################## User Dashboard Controller Start ##########################################
// ########################################## GET SPECIFIC Property Controller Start ##########################################
  export const controllerGetSpecificProperty=async (req,res)=>{
    const {id}=req.params
    console.log(req.params,"id")
    try{
      const SpecificProperty= await user.find({_id:id})
      res.status(200).json({
        SpecificProperty
      })
    }
    catch(err){
      res.status(500).json({
        messege:err
      })
    }
    
  }

// ########################################## GET Specific Property Controller End ##########################################

export const controllergetUsers = async (req, res) => {
  const { ClientId } = req.params;

  try {
    // const users = await signupmodel.find().count();
    // const pendingUser = await signupmodel.find({ status: "pending" }).count();
    

    const property = await user.find({ ClientId: req.params.ClientId });
    const pendingData = await user.find({
      $and: [{ ClientId: req.params.ClientId }, { status: "pending" }],
    });
    console.log(pendingData.length);
    const ApprovedData = await user.find({
      $and: [{ ClientId: req.params.ClientId }, { status: "Approved" }],
    });
    console.log(ApprovedData.length);

    return res.status(200).json({
      pendingCount: pendingData.length,
      ApprovedCount: ApprovedData.length,
      propertyCount: property.length,
      property: property,
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

// ########################################## Dashboard Controller END ##########################################
// ########################################## UpdatedProperty Controller START ##########################################

export const controllerUpdatedProperty = async (req, res) => {
  const { id } = req.params;
  const Image =
  req.files && req.files["propertyImg"]
    ? req.files["propertyImg"][0].filename
    : undefined;
    const video =
    req.files && req.files["propertyVideo"]
      ? req.files["propertyVideo"][0].filename
      : undefined;
  const pdf =
    req.files && req.files["propertypdf"]
      ? req.files["propertypdf"][0].filename
      : undefined;

  
  console.log(req.body)
  try {
    await user.findByIdAndUpdate(
    {_id:id},
      { ...req.body, Image: Image,video:video,pdf:pdf },
      {
        new: true,
      }
    );
    const updateddata = await user.find({ _id:id });
    res.status(200).json({
      updateddata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};
// ########################################## UpdatedProperty Controller END ##########################################

export const controllergetAdmin = async (req, res) => {
  try {
    const users = await signupmodel.find();
    const pendingUsers = await signupmodel.find({ status: "pending" });
    const property = await user.find();
    const pendingProperties = await user.find({ status: "pending" });
    console.log(user, "user");

    return res.status(200).json({
      usersCount: users.length,
      pendingCount: pendingUsers.length,
      propertyCount: property.length,
      pendingPropertiesCount: pendingProperties.length,
      users,
      property,
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
// ########################################## User Dashboard Controller Start ##########################################

// ########################################## User Dashboard Controller End ##########################################

// ########################################## Customer Controller Start ##########################################
export const controllerGetCustomers = async (req, res) => {
  try {
    const allUsers = await signupmodel.find();
    return res.status(200).json({
      allUsers: allUsers,
      usercount: allUsers.length,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ########################################## Customer Controller END ##########################################

// ########################################## Pending Customers Controller Start ##########################################
export const controllerGetpendingCustomers = async (req, res) => {
  try {
    const pendingCustomers = await signupmodel.find({ status: "pending" });
    return res.status(200).json({
      pendingCustomers,
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
// ########################################## Pending Customers Controller END ##########################################

// ########################################## pending Properties Controller Start ##########################################
export const controllerGetpendingProperties = async (req, res) => {
  try {
    const pendingProperties = await user.find({ status: "pending" });
    return res.status(200).json({
      pendingProperties,
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
// ########################################## pending Properties Controller END ##########################################


// ########################################## Approval Properties Controller Start ##########################################
export const controllerGetApprovalProperties = async (req, res) => {
  try {
    // const approvalProperties = await user.find({
    //   &and:[{ ClientId: req.params.ClientId }, { status: "Approved" }]

    // });

    const approvalProperties = await user.find({
      $and: [{ CompanyId: req.params.id }, { status: "Approved" }],
    });

    // $and: [{ ClientId: req.params.ClientId }, { status: "Approved" }],
    const lengthapproval=approvalProperties.length
 res.status(200).json({
   lengthapproval,
      approvalProperties,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// ########################################## Approval Properties Controller END ##########################################

// ########################################## GETCompany Controller START ##########################################

export const ControllergetCompanyId=async(req,res)=>{


  try{
    const company=await companyuser.find({userId:req.params.id})

    res.status(200).json({
      company

    })
  }
  catch(err){
    res.status(500).json({
      msg:"company not here"

    })
  }



}

// ########################################## GETCompany Properties Controller END ##########################################



// ########################################## Approval Status Change Controller Start ##########################################
export const controllerCustomerStatus = async (req, res) => {
  try {
    const { id, message } = req.body;
    console.log(typeof id);
    const Customers = await signupmodel.find({ _id: id });
    if (!Customers) {
      throw Error("user is found");
    }
    if (message == "Approved") {
      await signupmodel.findByIdAndUpdate(
        { _id: id },
        { status: message },
        { new: true }
      );
    } else {
      await signupmodel.findByIdAndUpdate(
        { _id: id },
        { status: message },
        { new: true }
      );
    }
    res.status(200).json({ message: "Update successfully" });
    console.log(id);
    console.log(message);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
// ########################################## Approval Status Change Controller END ##########################################

// ########################################## Approval Status Change Controller Start ##########################################
export const controllerpropertyStatus = async (req, res) => {
  try {
    const { id, message } = req.body;
    console.log(typeof id);
    const property = await user.find({ _id: id });
    if (!property) {
      throw Error("property is found");
    }
    if (message == "Approved") {
      await user.findByIdAndUpdate(
        { _id: id },
        { status: message },
        { new: true }
      );
    } else {
      await user.findByIdAndUpdate(
        { _id: id },
        { status: message },
        { new: true }
      );
    }
    res.status(200).json({ message: "Update successfully" });
    console.log(id);
    console.log(message);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
// ########################################## Approval Status Change Controller END ##########################################

// ########################################## Approval Property Controller START ##########################################

export const controllerApprovedProperty = async (req, res) => {
  try {
    const approvalProperties = await signupmodel.find({ status: "Approved" });
    res.status(200).json({
      approvalProperties,
    });
  } catch (err) {
    res.status(409).json({
      messege: err.message,
    });
  }
};
// ########################################## Approval Property Controller END ##########################################
