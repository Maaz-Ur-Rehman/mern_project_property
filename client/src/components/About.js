import React from "react";
import { Link } from "react-router-dom";
import "../css/About.css"

import Navbar from "./NavBar";
import {handleSearchClick, handleAboutClick, handleFeaturedClick} from "./HomePage";

function About() {
    return(
        <div className="about-details">
            <Navbar />
            <Link to="/">Back to home</Link>
        </div>
    );
}
export default About;