import React from "react";
import { Link } from "react-router-dom";
import "../css/BurgerMenu.css";

import usePopup from "../Hooks/usePopup.js";
import LoginPopup from "./LoginPopup.js";

import m_logo from "../images/M_LOGO_plane.png";

function Burgermenu(props) {

  const { isPopupOpen, open, close } = usePopup();
  
  // Load props
  const handleSearchClick = props.handlers.handleSearchClick;
  const handleAboutClick = props.handlers.handleAboutClick;
  const handleFeaturedClick = props.handlers.handleFeaturedClick;
  const burgerDimHandler = props.handlers.burgerDimHandler;

  return (
    <div>
      <nav className="main-navigation">
        <div className="menu-wrapper">
          <div className="menu-bg-wrap">
            <ul className="menu">
              <li className="menu-item active">
                <button onClick={homeClick}>HOME</button>
              </li>
              <li className="menu-item">
                <button onClick={buyRentClick}>BUY/RENT</button>
              </li>
              <li className="menu-item">
                <button onClick={aboutClick}>ABOUT</button>
              </li>
              <li className="menu-item">
                <button onClick={featuredClick}>FEATURED</button>
              </li>
              <li className="menu-item">
                <button onClick={open}>
                  BUSINESS <br></br>LOGIN
                </button>
              </li>
            </ul>
            <div className="menu-push"></div>
            <div className="menu-footer">
              <img src={m_logo} alt=""></img>
            </div>
          </div>
        </div>
      </nav>
      {isPopupOpen ? <LoginPopup closePopup={close} /> : null}
    </div>
  );

  function homeClick() {
    burgerDimHandler();
  }

  function buyRentClick() {
    burgerDimHandler();
    handleSearchClick();
  }

  function aboutClick() {
    burgerDimHandler();
    handleAboutClick();
  }

  function featuredClick() {
    burgerDimHandler();
    handleFeaturedClick();
  }
}

export default Burgermenu;
