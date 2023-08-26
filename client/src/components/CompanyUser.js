import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/CompanyUser.css";

import Navbar from "./CompanyUserNavbar.js";

function CompanyUser() {
	return(
		<div className="company-user">
			<Navbar />
		</div>
	);
}
export default CompanyUser;