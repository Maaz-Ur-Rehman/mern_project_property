import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "../css/HomePage.css";
import { AllcompanyData } from "../services/api";
import NavBar from "./NavBar.js";
import usePopup from "../Hooks/usePopup.js";
import Footer from "./Footer.js";

import heroImage from "../images/Home_Page_1.png";
import { waitFor } from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const aboutRef = useRef(null);
  const featuredRef = useRef(null);
  const { isPopupOpen, open, close } = usePopup(); // Popup stuff moved here so that it can be accessed from outside the navbar

  // Navbar option handlers
  function handleSearchClick() {
    searchRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
  function handleAboutClick() {
    aboutRef.current?.scrollIntoView({behavior: 'smooth'});
  }
  function handleFeaturedClick() {
    featuredRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  // OLD REDIRECT FUNCTIONALITY
  // function useRedirectTocompanyDetail() {
  //   const navigate = useNavigate();
  
  //   function redirectTocompanyDetail(url) {
  //     // <Link to={url} />
  //     // navigate(`${url}`);
  //   }
  
  //   return redirectTocompanyDetail;
  // }

  // TESTING PURPOSES
  // THIS ADDS A NEW COMPANY TO THE DATABASE IN ACCORDANCE WITH THE FORM IN THE "for developers" SECTION
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {};

    const form = document.getElementById('companyFormTemp');
    const formData = new FormData(form);

    requestBody.name = formData.get('name');
    requestBody.description = formData.get('description');
    requestBody.short_description = formData.get('sDescription');
    requestBody.theme = formData.get('theme');
    
    const readLogo = new Promise((resolve, reject) => {
      const logoReader = new FileReader();
      logoReader.onload = () => {
        const dataUrlParts = logoReader.result.split(',');
        const imageString = dataUrlParts[1];
        requestBody.logo = imageString;
        resolve();
      }
      logoReader.onerror = reject;
      logoReader.readAsDataURL(formData.get('logo'));
    });
    requestBody.logoType = formData.get('logoType')
    
    const readBanner = new Promise((resolve, reject) => {
      const bannerReader = new FileReader();
      bannerReader.onload = () => {
        const dataUrlParts = bannerReader.result.split(',');
        const imageString = dataUrlParts[1];
        requestBody.banner = imageString;
        resolve();
      }
      bannerReader.onerror = reject;
      bannerReader.readAsDataURL(formData.get('banner'));
    })
    requestBody.bannerType = formData.get('bannerType')

    try {
      await Promise.all([readLogo, readBanner]);
      fetch("https://mefa-backend.herokuapp.com/company/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
    } catch (error) {
      console.error(error);
    }
  }
  // end of testing purposes

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // Footer data
  const footerData = {
    color: "#000",
    textShadow: false,
  }

  return (
    <div className={`home ${isMenuOpen ? "show-menu" : ""}`}>
      <NavBar 
        burgerDimHandler={toggleMenu} // Burger menu toggle
        navbarScrollHandlers={{handleSearchClick, handleAboutClick, handleFeaturedClick}} // Scroll to page section after click
        popupProps={{isPopupOpen, open, close}} // Sign-in/Sign-up popup
        active="home"
      />{" "}
      <div className="hero">
        {" "}
        {/* This contains the page content */}
        <HeroImage />
        <div ref={searchRef}><HeroSearch /></div>
        <div ref={aboutRef}><HeroAbout /></div>
        <HeroLine />
        <div ref={featuredRef}><HeroFeatured /></div>

        {/* TEMPORARY */}
        <div style={{backgroundColor: "white"}}>
          <p>for developers</p>
          <Link to="/companyuser">Company User Dashboard</Link><br />
          <Link to={"/naturbau/" + "testhaha"}>Project Page</Link><br />
        </div>
        <div style={{backgroundColor: "white"}}>
          <form id="companyFormTemp" onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
            <input type="text" id="nameInput" name="name"></input>
            <label for="nameInput">Name</label>
            <input type="text" id="descriptionInput" name="description"></input>
            <label for="nameInput">Description</label>
            <input type="text" id="sDescriptionInput" name="sDescription"></input>
            <label for="sDescriptionInput">Short Description</label>
            <input type="text" id="themeInput" name="theme"></input>
            <label for="themeInput">Theme (hex)</label>

            <input type="file" id="logoInput" name="logo"></input>
            <label for="logoInput" >Logo</label>
            <input type="text" id="logoTypeInput" name="logoType"></input>
            <label for="logoTypeInput">logo type</label>
            <input type="file" id="bannerInput" name="banner"></input>
            <label for="bannerInput" >Banner (jpg)</label>
            <input type="text" id="bannerTypeInput" name="bannerType"></input>
            <label for="bannerTypeInput">banner type</label>
            
            <input type="text" id="statusInput" name="status"></input>
            <label for="statusInput">status</label>
            <input type="text" id="locationInput" name="location"></input>
            <label for="locationInput">location</label>

            <input type="submit" value="Upload"></input>
          </form>
        </div>
        {/* END OF TEMPORARY */}

      </div>
      <Footer pageType="landingPage" dynamicData="#000" />
    </div>
  );

  function HeroLine() {
    return(
      <div className="hero-line">
        <span/>
      </div>
    )
  }

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

    const data = { searchInput: "", locationInput: "" };
    var [inputData, setInputData] = useState({data});

    // function changeHandler(event) {
    //   setInputData({ ...inputData, [event.target.name]: event.target.value });
    // }

    const changeHandler = event => {
      const { name, value } = event.target;
      setInputData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    function searchClicked(event) {
      event.preventDefault();
      let url = "/search"
      if (inputData.searchInput) {
        url += `?searchInput=${inputData.searchInput}`;
      }
      if (inputData.locationInput) {
        url += `${inputData.searchInput ? "&" : "?"}locationInput=${inputData.locationInput}`;
      }
      navigate(url);
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

  function HeroAbout() { // TODO: Sign up & Learn More styling
    return(
      <div className="hero-about">
        <h1>YOUR CENTRE FOR REAL ESTATE</h1>
        <p>
          Browse real estate development companys or properties using the search box!<br/>
          <u>or</u><br/>
          <a href="#" onClick={open}>Sign up</a> to start marketing your real estate! {/* ISSUE: Clicking Sign up goes to the top of the page */}
        </p>
        <Link to="/about">Learn More</Link>
      </div>
    )
  }

  function HeroFeatured() {
    
    const [companies, setCompanies] = useState([]);
    // useEffect(() => {
    //   fetch('https://mefa-backend.herokuapp.com/company/list')
    //     .then(response => response.json())
    //     .then(data => setCompanies(data))
    //     .catch(error => console.error(error));
    // }, []);
    // const featuredCompanies = companies.slice(4, 7);

    useEffect(() => {
      const getData = async () => {
        try {
          const data = await AllcompanyData();
          const datas = data.companyData;
          // const newDataSource = datas.map((item) => ({
          //   cName: item.companyname,
          //   des: item.description,
          //   image: item.Image,
          //   _id: item._id, // Assuming the item has an '_id' property
          // }));
          setCompanies(datas);
          console.log(datas,"dklsjfdslfj")
        } catch (error) {
          console.error(error);
        }
      };
  
      getData();
    }, []);
  

    // const featuredCompanies = companies.slice(4, 7);
    // console.log(featuredCompanies,"featurecompanies")
    return (
      <div className="hero-featured">
        <h1>FEATURED</h1>
        <p className="featured-subtext">
          Here are some of our partners.
        </p>
        <div className="featured-cards">
          {companies.map(company => (
            <div className="card-container">
              <button>
                <Link to={`/${company._id}`}>
                  <div className="company-preview">
                    <img src="https://picsum.photos/600/600" alt={company.name} /> 
                  </div>
                  <div className="company-name">
                    <p>{company.companyname}</p>
                  </div>
                </Link>
              </button>
              <p className="card-subtext">{company.description}</p>
              <span />
            </div>
          ))}
          {/* {featuredCompanies.map(company => (
            <div className="card-container">
              <button>
                <Link to={`/${company.slug}`}>
                  <div className="company-preview">
                    <img src="https://picsum.photos/600/600" alt={company.name} /> 
                  </div>
                  <div className="company-name">
                    <p>{company.companyname}</p>
                  </div>
                </Link>
              </button>
              <p className="card-subtext">{company.description}</p>
              <span />
            </div>
          ))} */}
          
        </div>
      </div>
    );
  }
}

export default HomePage;
