import React, { useContext, useEffect } from 'react'
import AppHeader from '../Dashboard/Components/AppHeader';
import SideMenu from './Components/SideMenu';
import PageContent from './Components/PageContent';
import axios from 'axios';



const UserDashboard = () => {

  // const {clientId,setClientId}=useContext(ClientIdContext)
  // console.log(clientId,"clientId")
  let getData = async () => {
    let userToken = localStorage.getItem("userDataToken");
  
    axios
    .get("http://localhost:7000/validuser", {
      headers: {
        Authorization: userToken,
      },
    })
   .then((res)=>{
    if (res.data.status === 401 || !res.data) {
        console.log("error page")
        // navigate("*");
      } else {
  
        console.log("user verify")

        // setClientId(res.data.validUser)
        console.log(res.data.validUser)
        localStorage.setItem("userId",res.data.validUser._id)
        // setLoginData(res.data.validUser.email);
        // setLoginData(res.data.validUser)
        // console.log(loginData);
        
        // navigate("/dash");
      }
    })
   .catch((err)=>{
    console.log(err)
   })
  
  
    // console.log(userToken);
  };
  
  useEffect(() => {
    // setTimeout(() => {
      getData();
      // setData(true);
    // }, 2000);
  }, []);
  
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent" style={{background: "#F2F2F2"}}>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      {/* <AppFooter /> */}
    </div>
  );
}

export default UserDashboard