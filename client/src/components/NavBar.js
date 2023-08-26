import React, { useState } from "react";
import "../css/NavBar.css";

import Burgermenu from "./BurgerMenu.js";
import LoginPopup from "./LoginPopup.js";

import logo from "../images/MEFA_LOGO_plane.png";

function Navbar(props) {
  // Put handlers into variables for readability
  const handleSearchClick = props.navbarScrollHandlers.handleSearchClick;
  const handleAboutClick = props.navbarScrollHandlers.handleAboutClick;
  const handleFeaturedClick = props.navbarScrollHandlers.handleFeaturedClick;
  const burgerDimHandler = props.burgerDimHandler;

  return (
    <nav className={`site-nav ${props.pageType} `}>
      <div className="container">
        <div className="menu-bg-wrap">
          <a href="/" className="logo float-start">
            <img src={logo} alt=""></img>
          </a>

          <ul className="d-none site-menu float-start">
            <li className={ props.active==="home" ? "active" : "" }>
              <a href="/">HOME</a>
            </li>
            <li className={ props.active==="search" ? "active" : "" }>
              <button onClick={handleSearchClick}>BUY/RENT</button>
            </li>
            <li className={ props.active==="about" ? "active" : "" }>
              <button onClick={handleAboutClick}>ABOUT</button>
            </li>
            <li className={ props.active==="featured" ? "active" : "" }>
              <button onClick={handleFeaturedClick}>FEATURED</button>
            </li>
          </ul>

          <a
            href="#"
            onClick={props.popupProps.open}
            className="login float-end"
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

export default Navbar;
