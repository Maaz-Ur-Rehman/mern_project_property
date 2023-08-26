import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage.js";
import About from "./About.js";
import CompanyUser from "./CompanyUser.js";
import CompanyPage from "./CompanyPage1/CompanyPage.js";
import ProjectPage from "./ProjectPage/ProjectPage.js";
import SearchResults from "./SearchResults.js";
import IndividualPage from "./IndividualPage/IndividualPage.js";

import "../css/General.css";
import "../css/App.css";
// import "../css/style.css";
import Dashboard from "./Dashboard/Dashboard.js";
import Inventory from "./Dashboard/Pages/Inventory/index.js";
import Orders from "./Dashboard/Pages/Orders/index.js";
import Customers from "./Dashboard/Pages/Customers/index.js";
import PendingCustomers from "./Dashboard/Pages/pendingCustomers/index.js";
import PendingProperties from "./Dashboard/Pages/PendingProperties/index.js";
import Error from "./Error";
import UserDashboard from "./UserDashboard/UserDashboard";
import UserPendingProperties from "./UserDashboard/Pages/PendingProperties";
import Form from "./Form";
import ClientDashboard from "./Dashboard/Dashboard.js";
import UpdateForm from "./updateForm";
import Companyformform from "./companyform.js";

// import "../css/styleOLD.css"; OLD CSS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/companyuser" element={<CompanyUser />} />
        <Route path="/:companySlug" element={<CompanyPage />} />
        <Route path="/:companySlug/:projectName" element={<ProjectPage />} />
        <Route path="/:companyName" element={<CompanyPage />} />
        <Route path="/:companyName/:projectName" element={<ProjectPage />} />
        <Route path="/individual/:propertySlug" element={<IndividualPage />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/companyform" element={<Companyformform />} />

        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/pendingCustomers" element={<PendingCustomers />} />
        <Route path="/PendingProperties" element={<PendingProperties />} />
        <Route path="*" element={<Error />} />
        <Route path="/userdash" element={<UserDashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/editform" element={<UpdateForm />} />
        <Route path="/properties" element={<UserPendingProperties />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
