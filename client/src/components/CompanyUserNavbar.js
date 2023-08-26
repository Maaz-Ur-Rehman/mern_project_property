import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/CompanyUserNavbar.css";


function Navbar() {
	return (
		<nav className="companyuser-nav">

			<img className="float-start" src="https://via.placeholder.com/100x100" alt=""></img> {/* DYNAMIC DATA */}

			<p className="float-start">DYNAMIC_COMPANYNAME</p> {/* DYNAMIC DATA */}
			
			<button
				className="button-burger d-lg-none float-end"
			>
				<span className="bar bar-1"></span>
				<span className="bar bar-2"></span>
				<span className="bar bar-3"></span>
			</button>

			<ul className="d-none site-menu float-start">
				<li className="active">
					<a href="/">HOME</a>
				</li>
				<li>
					<button>BUY/RENT</button>
				</li>
				<li>
					<button>ABOUT</button>
				</li>
				<li>
					<button>FEATURED</button>
				</li>
			</ul>

			<a href="#" className="login float-end">
				BUSINESS LOGIN
			</a>

		</nav>
	);
}
export default Navbar;