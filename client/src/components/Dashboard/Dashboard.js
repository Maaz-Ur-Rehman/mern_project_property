// import { Space } from "antd";
import "./Dashboard.css";
// import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    
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
export default Dashboard;
