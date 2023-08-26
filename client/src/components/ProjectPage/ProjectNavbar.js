import React from "react";
import { Link } from "react-router-dom";
import "../../css/NavBar.css";

import Burgermenu from "../BurgerMenu.js";
import LoginPopup from "../LoginPopup.js";

function ProjectNavbar(props) {
  // Put handlers into variables for readability
  const handleAboutClick = props.navbarScrollHandlers.handleAboutClick;
  const handleGalleryClick = props.navbarScrollHandlers.handleGalleryClick;
  const handleSearchClick = props.navbarScrollHandlers.handleSearchClick;
  const burgerDimHandler = props.burgerDimHandler;

  // Load dynamic data
  const { dynamicData } = props;

  return (
    <nav
      className={`site-nav ${props.pageType} `}
      style={{ backgroundColor: dynamicData.color }}
    >
      <div className="container">
        <div className="menu-bg-wrap">
          <Link
            to={`/${dynamicData.companySlug}`}
            className="logo float-start"
            style={{ color: dynamicData.textShadow ? "black" : "white" }}
          >
            {dynamicData.textData.companyName}
          </Link>

          <ul className="d-none site-menu float-start">
            <li>
              <button
                onClick={handleAboutClick}
                style={{ color: dynamicData.textShadow ? "black" : "white" }}
              >
                ABOUT
              </button>
            </li>
            <li>
              <button
                onClick={handleGalleryClick}
                style={{ color: dynamicData.textShadow ? "black" : "white" }}
              >
                GALLERY
              </button>
            </li>
            <li>
              <button
                onClick={handleSearchClick}
                style={{ color: dynamicData.textShadow ? "black" : "white" }}
              >
                BUY/RENT
              </button>
            </li>
          </ul>

          <a
            href="#"
            onClick={props.popupProps.open}
            className="login float-end"
            style={{ color: dynamicData.textShadow ? "black" : "white" }}
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
          handleGalleryClick,
          burgerDimHandler,
        }}
      />
      {props.popupProps.isPopupOpen ? (
        <LoginPopup closePopup={props.popupProps.close} />
      ) : null}
    </nav>
  );
}

export default ProjectNavbar;
