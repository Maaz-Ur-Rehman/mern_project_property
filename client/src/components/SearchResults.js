import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "../css/SearchResults.css";

import usePopup from "../Hooks/usePopup.js";
import useQuery from "../Hooks/useQuery.js";

import NavBar from "./NavBar";
import Footer from "./Footer";
import ImageSliderProperty from "./ImageSliderProperty";
import ImageSliderProject from "./ImageSliderProject";

import heroImage from "../images/Home_Page_1.png";

function SearchResults() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isPopupOpen, open, close } = usePopup(); // Popup stuff moved here so that it can be accessed from outside the navbar
  const searchRef = useRef(null);
  
  // Retrieve search parameters from URL
  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchInput = urlSearchParams.get('searchInput');
  const locationInput = urlSearchParams.get('locationInput');

  // Make the query
	const results = useQuery(searchInput, locationInput);
  console.log(results);

	return(
		<div className={`search-page ${isMenuOpen ? "show-menu" : ""}`}>
      <NavBar 
        burgerDimHandler={toggleMenu} // Burger menu toggle
        navbarScrollHandlers={{handleSearchClick, handleAboutClick, handleFeaturedClick}} // Scroll to page section after click
        popupProps={{isPopupOpen, open, close}} // Sign-in/Sign-up popup
				active="search"
      />{" "}
      <div className="hero">
        {" "}
        {/* This contains the page content */}
        <HeroImage />
        <div ref={searchRef}><HeroSearch /></div>
        <HeroResults results={results} />
      </div>
      <Footer pageType="landingPage" dynamicData="#000" />
    </div>
	);

	// COMPONENTS
  function HeroImage() {
    return (
      <div className="hero-image">
        <img src={heroImage} alt=""></img>
      </div>
    );
	}

	function HeroSearch() {
    return(
      <div className="hero-search">
        <h2 className="search-header">REAL ESTATE, APARTMENTS, HOUSES</h2>
        <SearchForm />
      </div>
    )
  }

  function SearchForm() {

    const data = { searchInput: searchInput, locationInput: locationInput };

    var [inputData, setInputData] = useState(data);
    function changeHandler(event) {
      setInputData({ ...inputData, [event.target.name]: event.target.value });
    }

    function searchClicked() {
      console.log("Searching..."); // TODO
    }
    
    return(
      <form onSubmit={searchClicked}>
        <div className="form-inputs">
          <div className="form-field">
            <label>What?
              <input
                type="text"
                placeholder="WHAT ARE YOU LOOKING FOR?"
                name="searchInput"
                value={inputData.searchInput || ""}
                onChange={changeHandler}
              />
            </label>
          </div>
          <div className="form-field">
            <label>Where?
              <input
                type="text"
                placeholder="CITY, ZIP CODE, FEDERAL STATE"
                name="locationInput"
                value={inputData.locationInput || ""}
                onChange={changeHandler}
              />
            </label>
          </div>
        </div>
        <div className="form-options">
          <div className="search-button float-end">
            <button type="submit">SEARCH</button>
          </div>
        </div>
      </form>
    );
  }

  function HeroResults(props) {

    // TEMPORARY

    const images = [
      "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
      "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      "https://www.baufritz.com/01_Haeuser/Kundenh%C3%A4user/2019/Richter/Bilder/247/image-thumb__247__hero/-8585855483413193058.jpg",
    ];

    // END OF TEMPORARY
    if (!props.results) {
      return <div className="hero-results"><h1>LOADING...</h1></div>
    }
    else {
      return (
        <div className="hero-results">
          <div className="projects-column">
            <h1>REAL ESTATE PROJECTS</h1>
            {props.results.projects.length > 0 
              ? props.results.projects.map(project => (
                <ImageSliderProject
                  images={images} // STATIC
                  title={project.name}
                  description={project.description}
                  properties="STATIC" // STATIC
                  Location="STATIC" // STATIC
                  color="#000"
                  textShadow={false}
                />
              ))
              : <h2>NONE FOUND</h2>
            }
          </div>
          <div className="properties-column">
            <h1>INDIVIDUAL PROPERTIES</h1>
            {props.results.properties.length > 0 
              ? props.results.properties.map(property => (
                <ImageSliderProperty 
                  price={property.price}
                  images={images} // STATIC
                  title={property.title}
                  description={property.description}
                  space="STATIC" // STATIC
                  rooms="STATIC" // STATIC
                  totalSpace={property.area}
                  Location={property.location}
                  color="#000"
                  textShadow={false}
                />
              ))
              : <h2>NONE FOUND</h2>
            }
          </div>
        </div>
      )
    }
  }

	// SCRIPTS TODO NAVBAR HANDLERS
	function handleSearchClick() {

	}
	function handleAboutClick() {

	}
	function handleFeaturedClick() {

	}
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
	
}

export default SearchResults;