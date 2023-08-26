import React from "react";
import {Link} from "react-router-dom";
import "../../css/NavBar.css";

import Burgermenu from "../BurgerMenu.js";
import LoginPopup from "../LoginPopup.js";

import logo from "../../images/MEFA_LOGO_plane.png";

function CompanyNavbar(props) {
  // Put handlers into variables for readability
  const handleAboutClick = props.navbarScrollHandlers.handleAboutClick;
  const handleFeaturedClick = props.navbarScrollHandlers.handleFeaturedClick;
  const handleSearchClick = props.navbarScrollHandlers.handleSearchClick;
  const burgerDimHandler = props.burgerDimHandler;

  // Load dynamic data
  const {dynamicData} = props;

  return (
    <nav className={`site-nav ${props.pageType} `} style={{'backgroundColor': dynamicData.color}}>
      <div className="container">
        <div className="menu-bg-wrap">

          <Link 
            to={`/${dynamicData.companySlug}`} 
            className="logo float-start" 
            style={{"color": dynamicData.textShadow ? "black" : "white"}}
            >
            {dynamicData.textData.companyName}
          </Link>

          <ul className="d-none site-menu float-start" >
            <li>
              <button onClick={handleAboutClick} style={{"color": dynamicData.textShadow ? "black" : "white"}}>ABOUT</button>
            </li>
            <li>
              <button onClick={handleFeaturedClick} style={{"color": dynamicData.textShadow ? "black" : "white"}}>PROJECTS</button>
            </li>
            <li>
              <button onClick={handleSearchClick} style={{"color": dynamicData.textShadow ? "black" : "white"}}>BUY/RENT</button>
            </li>
          </ul>

          <a
            href="#"
            onClick={props.popupProps.open}
            className="login float-end"
            style={{"color": dynamicData.textShadow ? "black" : "white"}}
          >
            BUSINESS LOGIN
          </a>

          <button
            className="button-burger d-lg-none float-end"
            onClick={burgerDimHandler}
          >
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </button>

        </div>
      </div>
      <Burgermenu
        handlers={{
          handleSearchClick,
          handleAboutClick,
          handleFeaturedClick,
          burgerDimHandler,
        }}
      />
      {props.popupProps.isPopupOpen ? (
        <LoginPopup closePopup={props.popupProps.close} />
      ) : null}
    </nav>
  );
}

export default CompanyNavbar;
