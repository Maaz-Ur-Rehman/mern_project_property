import axios from 'axios'


const URL="http://localhost:7000"


export const signup= async (data)=>{
    try{
        return await axios.post(`${URL}/signup`,data)
    }
    catch(err){
        console.log(`err occur in api file ${err}`)
    }
}
export const companyformdata = async (data) => {
    try{
        return await axios.post(`${URL}/comform`,data)
    }catch(error){
        console.log("error occur in api file " + error)
    }
}
export const AllcompanyData=async()=>{
    const {data}=await axios.get(`${URL}/getcompany`)
    return data;
}
export const signin = async (data) => {
    try{
        return await axios.post(`${URL}/login`,data)
    }catch(error){
        console.log("error occur in api file " + error)
    }
}
export const specificproperty=async()=>{
    const key=localStorage.getItem("keyId") 
    console.log(key,"key")
    const {data}=await axios.get(`${URL}/specificProperty/${key}`)
    return data;
}
export const specificCompany=async()=>{

    const userId=localStorage.getItem("userId") 
    const {data}=await axios.get(`${URL}/getcompany/${userId}`)
    console.log(data,"data")
    return data

}
export const dashboarddata = async()=>{
    const userId=localStorage.getItem('userId')
    // console.log(userId,"useridddddd")
    const {data} = await axios.get(`${URL}/UserDashboard/${userId}`)
          return data;
      
      }
      export const updatedashboarddata = async(data)=>{
        const formId=localStorage.getItem('formId')
        try{

            return await axios.put(`${URL}/updateProperty/${formId}`,data )
        }
        catch(err){
            console.log("error occur in api file " + err)
        }
          
          }

      
      export const admindashboarddata = async()=>{
        // const userId=localStorage.getItem('userId')
        const {data} = await axios.get(`${URL}/Dashboard`)
              return data;
          
          }

      export const GetCustomers = async() => {
        try {
          const { data } = await axios.get(`${URL}/Customers`);
          return data;
        } catch(error) {
        //   console.error(error);
          throw error;
        }
      }


      
  export const GetpendingCustomers = async ()=>{
    try{
        const {data} = await axios.get(`${URL}/pendingCustomers`);
        return data
        // return console.log(data);
        
    }catch(error){
        console.log("error occur in api file  pending Users " + error)

    }
  }


  export const Getpendingproperties = async ()=>{
    try{
        const {data} = await axios.get(`${URL}/pendingProperties`);
        return data
        // return console.log(data);
        
    }catch(error){
        console.log("error occur in api file  pending properties " + error)

    }
  }
  export const GetallApproveProperty = async ()=>{
    const companyId=localStorage.getItem("companyId")


    try{
        const {data} = await axios.get(`${URL}/allApproveProperty/${companyId}`);
        return data
        // return console.log(data);
        
    }catch(error){
        console.log("error occur in api file  pending Users " + error)

    }
  }

  export const  GetApprovalProperties=async()=>{
    try{

        const {data}=await axios.get(`${URL}/approveProperty`)
        return data
    }
    catch(err){
        console.log("error occur in api file  Approval properties " + err)

    }
  }
  export const apiformdata = async (data) => {
    try{
        return await axios.post(`${URL}/form`,data)
    }catch(error){
        console.log("error occur in api file " + error)
    }
}
     export const statuschange = async (data)=>{
    try{
        return await axios.put(`${URL}/statuschange`,data);
    }catch(error){
        console.log("error occur in api file statuschange "+ data.id );
    }
  } 
  export const statusPropertychange = async (data)=>{
    try{
        return await axios.put(`${URL}/statusPropertychange`,data);
    }catch(error){
        console.log("error occur in api file statuschange "+ data.id );
    }
  } 
 
