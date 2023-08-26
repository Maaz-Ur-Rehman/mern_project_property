import Express, { Router } from "express";
import {
  controllerform,
  controllerSignup,
  controllerSignin,
  controllergetUsers,
  controllerGetCustomers,
  controllerGetpendingCustomers,
  controllerGetpendingProperties,
  controllerCustomerStatus,
  controllerpropertyStatus,
  controllerValidUser,
  controllerApprovedProperty,
  controllergetAdmin,
  controllerUpdatedProperty,
  controllerGetSpecificProperty,
  controllerGetApprovalProperties,
  controllerCompanyform,
  controllerGetCompany,
  ControllergetCompanyId
} from "../controller/formcontroller.js";
// const multer = require('multer');
import multer from "multer";
import Path from "path";
import { authenticate } from "../middleware/authenticate.js";
const router = Express.Router();

const imageconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + `-` + Date.now() + Path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: imageconfig,
});

// router.post('/add',upload.single("propertyImg") ,controllerform)

router.post('/form',upload.fields([ {name : 'propertyImg' }, {name : 'propertyVideo' }, {name : 'propertypdf' } ]) ,controllerform)
router.post('/comform',upload.fields([ {name : 'propertyImg' } ]) ,controllerCompanyform)
router.get('/getcompany',controllerGetCompany)
router.post("/signup", controllerSignup);
router.post("/login", controllerSignin);
router.get("/validuser", authenticate, controllerValidUser);
router.get("/UserDashboard/:ClientId", controllergetUsers);
router.get("/Dashboard", controllergetAdmin);
router.get("/specificProperty/:id",controllerGetSpecificProperty)
router.get("/Customers", controllerGetCustomers);
router.get("/pendingCustomers", controllerGetpendingCustomers);
router.get("/pendingProperties", controllerGetpendingProperties);
router.put("/statuschange", controllerCustomerStatus);
router.put("/statusPropertychange", controllerpropertyStatus);
router.get("/approveProperty", controllerApprovedProperty);
router.get("/allApproveProperty/:id",controllerGetApprovalProperties)
router.get("/getcompany/:id",ControllergetCompanyId)
router.put('/updateProperty/:id' ,upload.fields([ {name : 'propertyImg' }, {name : 'propertyVideo' }, {name : 'propertypdf' } ]) ,controllerUpdatedProperty)
export default router;

