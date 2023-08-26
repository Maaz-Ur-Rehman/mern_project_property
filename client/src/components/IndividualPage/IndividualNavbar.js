import React from "react";
import { Link } from "react-router-dom";
import "../../css/NavBar.css";

import Burgermenu from "../BurgerMenu.js";
import LoginPopup from "../LoginPopup.js";

function IndividualNavbar(props) {
  // Put handlers into variables for readability
  const handleAboutClick = props.navbarScrollHandlers.handleAboutClick;
  const handleGalleryClick = props.navbarScrollHandlers.handleGalleryClick;
  const handlePlanClick = props.navbarScrollHandlers.handlePlanClick;
  const handleContactClick = props.navbarScrollHandlers.handleContactClick;
  const burgerDimHandler = props.burgerDimHandler;

  // Load dynamic data
  const { dynamicData } = props;
  console.log(dynamicData,"lsdafjkalksdfbslnajdls,dnflaksj")

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
            {dynamicData.propertyData.title}
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
                onClick={handlePlanClick}
                style={{ color: dynamicData.textShadow ? "black" : "white" }}
              >
                PLANS
              </button>
              <button
                onClick={handleContactClick}
                style={{ color: dynamicData.textShadow ? "black" : "white" }}
              >
                CONTACT
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
          handlePlanClick,
          handleContactClick,
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

export default IndividualNavbar;
