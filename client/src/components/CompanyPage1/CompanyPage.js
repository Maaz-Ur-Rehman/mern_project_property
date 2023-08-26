import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./CompanyPage.css";
import "../../css/HomePage.css";

import CompanyNavbar from "./CompanyNavbar.js";
import usePopup from "../../Hooks/usePopup.js";
import Footer from "../Footer.js";
import Cards from "./Cards.js";
import ImageSlider from "./ImageSlider";

import heroImage from "../../images/Company_01.png";
import company_logo from "../../images/Company_01_Logo.png";
import mid from "../../images/mid-company.png";
import { AllcompanyData, GetallApproveProperty } from "../../services/api";

function CompanyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const aboutRef = useRef(null);
  const featuredRef = useRef(null);
  const { isPopupOpen, open, close } = usePopup(); // Popup stuff moved here so that it can be accessed from outside the navbar

  function handleAboutClick() {
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function handleFeaturedClick() {
    featuredRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  function handleSearchClick() {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const { companySlug } = useParams(); // THIS IS FOR THE API CALL FOR THE DYNAMIC DATA

// console.log(companySlug,"companyId")

localStorage.setItem("companyId",companySlug)




    const [properties,setProperties]=useState([])


  // Load company list
  // useEffect(() => {
    //   fetch(`https://mefa-backend.herokuapp.com/company/list`)
  //     .then((response) => response.json())
  //     .then((data) => setCompanyList(data));
  // }, []);

  
  useEffect(() => {
    const getData = async () => {
      try {
      const data = await GetallApproveProperty();
      // console.log(data,"data get all")
      const datas=data.approvalProperties
      setProperties(datas);
      console.log(datas, "allapprove data");
    } catch (error) {
      console.error(error);
    }
  };
  
  getData();
}, []);

const [companyList, setCompanyList] = useState(null);


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
            setCompanyList(datas);
            console.log(datas,"dklsjfdslfj")
          } catch (error) {
            console.error(error);
          }
        };
    
        getData();
      }, []);
    

  // Index company using slug
  let companyData = null;
  if (companyList) {
    for (let i = 0; i < companyList.length; i++) {
      if (companyList[i]._id === companySlug) {
        companyData = companyList[i];
        break;
      }
    }
  }

  if (companyList && companyData) {
    // Page won't display until dynamic data is loaded

    const textData = {
      image:companyData.Image,
      companyName: companyData.companyname,
      welcome: `WELCOME TO ${companyData.companyname.toUpperCase()}`, // TODO Maybe give them the option to change this willingly
      about: companyData.description,
    };

    const textShadow = colorIsBright("#ff4040");

    const dynamicData = {
      // This is the dynamic data map object which will be passes to each component which needs dynamic data
      companySlug: companySlug,
      color: "#ff4040",
      textData: textData,
      textShadow: textShadow,
    };

    console.log(dynamicData,"dynamicdata")
    
    return (
      <div className={`home ${isMenuOpen ? "show-menu" : ""}`}>
        <div>
          <CompanyNavbar
            burgerDimHandler={toggleMenu} // Burger menu toggle
            navbarScrollHandlers={{
              handleAboutClick,
              handleSearchClick,
              handleFeaturedClick,
            }} // Scroll to page section after click
            pageType="companyPage"
            dynamicData={dynamicData}
            popupProps={{ isPopupOpen, open, close }} // Sign-in/Sign-up popup
          />
        </div>
        <div className="company">
          {/* This contains the page content */}
          <div>
            <HeroImage />{" "}
            {/* The image can be changed from the HeroImage function at the end of the code */}
          </div>
          <div>
            <Logo dynamicData={dynamicData} />{" "}
            {/* The logo image can be changed from the Logo function at the end of the code */}
          </div>
          <div ref={aboutRef}>
            <HeroAbout dynamicData={dynamicData} />
            {/* The about text can be changed from the HeroAbout function at the end of the code */}
          </div>
          <HeroLine
            color={dynamicData.color}
            textShadow={dynamicData.textShadow}
          />
          <div ref={featuredRef} className="cards">
            {/* <FeatureCards dynamicData={dynamicData} />{" "} */}
            {/* The number of Cards and its contents can be changed from the FeatureCards function at the end of the code */}
          </div>
          <HeroLine color={dynamicData.color} />
          <div ref={searchRef}>
            <MidImage />
            {/* The Midpage image can be changed from the MidImage function at the end of the code */}
          </div>
          <div>
            <HeroSearch
              color={dynamicData.color}
              textShadow={dynamicData.textShadow}
            />
          </div>
          <div>
          {/* {Array.isArray(companies) && companies.map(property => (
            <div className="card-container" key={property.id}>
              <button>
              <Link to={`/individual/${property._id}`} state={{ property }}>

                  <div className="company-preview">
                    <img src={`http://localhost:7000/uploads/${property.Image}` } alt={property.location} />
                  </div>
                  <div className="company-name">
                    <p>{property.property_type}</p>
                  </div>
                </Link>
              </button>
              <p className="card-subtext">{property.description}</p>
              <span />
            </div>
          ))} */}
        <div className="featured-cards">
          {properties.map(property => (
            <div className="card-container">
              <button>
                <Link to={`/individual/${property._id}`}>
                  <div className="company-preview">
                  <img src={`http://localhost:7000/uploads/${property.Image}` } alt={property.location} />
                  </div>
                  <div className="company-name">
                    <p>{property.title}</p>
                  </div>
                </Link>
              </button>
              <p className="card-subtext">{property.priceTo}</p>
              <span />
            </div>
          ))}

</div>

            {/* <Results dynamicData={dynamicData} />{" "} */}
            {/* The number of resutls and its contents can be changed from the Results function at the end of the code */}
          </div>
        </div>
        <Footer pageType="companyPage" dynamicData={dynamicData} />
      </div>
    );
  }

  function HeroImage() {
    return (
      <div className="company-image">
        <img src={heroImage} alt=""></img>
      </div>
    );
  }

  function Logo(props) {
    const { dynamicData } = props;

    return (
      <div className="company-logo">
        <img src={`http://localhost:7000/uploads/${dynamicData.textData.image}`} alt=""></img>
      </div>
    );
  }

  function HeroAbout(props) {
    const { dynamicData } = props;
    return (
      <div className="company-about">
        <h1
          className={
            dynamicData.textShadow === 2
              ? "black-text"
              : dynamicData.textShadow === 1
              ? "text-shadow"
              : ""
          }
          style={{ color: dynamicData.color }}
        >
          {dynamicData.textData.welcome}
        </h1>
        <p>{dynamicData.textData.about}</p>
      </div>
    );
  }

  function HeroLine(props) {
    return (
      <div className="company-line">
        <span
          style={{
            backgroundColor: props.textShadow != 2 ? props.color : "black",
          }}
        />
      </div>
    );
  }

  function FeatureCards(props) {
    const { dynamicData } = props;

    // Load company's projects
    const [projectList, setProjectList] = useState(null);
    useEffect(() => {
      fetch(
        `https://mefa-backend.herokuapp.com/company/${
          companyData ? companyData._id : "646804eb2a9c4cb3da584caa"
        }/projects`
      )
        .then((response) => response.json())
        .then((data) =>{ 
          
          setProjectList(data)});
          console.log(projectList,"projectlist")
    }, []);
    function cards(data) {
      return (
        <Cards
          key={1}
          projectID={data._id}
          companySlug="{dynamicData.companySlug}"
          projectSlug="{data.projectSlug}"
          image="https://www.imaginationshaper.com/product_images/exterior-design616.jpg"
          name={data.name}
          color={dynamicData.color}
          textShadow={dynamicData.textShadow}
        />
      );
    }

    if (projectList) {
      return <div>{projectList.map(cards)}</div>;
    } else return <div></div>;
  }

  function MidImage() {
    return (
      <div>
        <img src={mid} alt="" className="mid-image"></img>
      </div>
    );
  }

  function HeroSearch(props) {
    return (
      <div
        className={
          "company-search" + (props.textShadow ? " text-shadow-s-blur" : "")
        }
        style={{ color: props.color }}
      >
        <h2 className="search-header">REAL ESTATE, APARTMENTS, HOUSES</h2>
        <SearchForm color={props.color} textShadow={props.textShadow} />
      </div>
    );
  }

  function SearchForm(props) {
    const data = { searchInput: "", locationInput: "" };

    var [inputData, setInputData] = useState({ data });
    function changeHandler(event) {
      setInputData({ ...inputData, [event.target.name]: event.target.value });
    }

    function searchClicked() {
      console.log("Searching..."); // TODO
    }

    return (
      <form onSubmit={searchClicked}>
        <div className="company-form-inputs">
          <div className="company-form-field">
            <label>
              What?
              <input
                type="text"
                placeholder="WHAT ARE YOU LOOKING FOR?"
                name="searchInput"
                value={inputData.searchInput || ""}
                onChange={changeHandler}
              />
            </label>
          </div>
          <div className="company-form-field">
            <label>
              Where?
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
        <div className="company-form-options">
          <div className="search-button float-end">
            <button
              className={
                props.textShadow === 2
                  ? "black-text"
                  : props.textShadow === 1
                  ? "text-shadow"
                  : ""
              }
              type="submit"
              style={{ backgroundColor: props.color }}
            >
              SEARCH
            </button>
          </div>
        </div>
      </form>
    );
  }

  /* Add more object element with its data to add new results */

  function Results(props) {
    const { dynamicData } = props;
    const Data = [
      {
        key: 1,
        images: [
          "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
          "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
          "https://www.baufritz.com/01_Haeuser/Kundenh%C3%A4user/2019/Richter/Bilder/247/image-thumb__247__hero/-8585855483413193058.jpg",
        ],
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, " +
          "sed diam nonumy eirmod tempor invidunt ut labore etdolore magna aliquyam erat, sed diam",
        price: 25000,
        space: "100m",
        rooms: 2,
        totalSpace: "170m",
        Location: "57074 Siegen",
      },

      {
        key: 2,
        images: [
          "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
          "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
          "https://www.baufritz.com/01_Haeuser/Kundenh%C3%A4user/2019/Richter/Bilder/247/image-thumb__247__hero/-8585855483413193058.jpg",
        ],
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, " +
          "sed diam nonumy eirmod tempor invidunt ut labore etdolore magna aliquyam erat, sed diam",
        price: 12000,
        space: "80m",
        rooms: 1,
        totalSpace: "130m",
        Location: "57125 Köln",
      },
    ];

    function slider(data) {
      return (
        <ImageSlider
          key={data.key}
          price={data.price}
          images={data.images}
          description={data.description}
          space={data.space}
          rooms={data.rooms}
          totalSpace={data.totalSpace}
          Location={data.Location}
          color={dynamicData.color}
          textShadow={dynamicData.textShadow}
        />
      );
    }

    return <div className="slider"> {Data.map(slider)}</div>;
  }

  function colorIsBright(color) {
    const threshold = 250; // threshold for determining if color is considered bright (arbitrary)
    const extraThreshold = 350;

    let colorInt = parseInt(color.slice(1), 16);
    let b = colorInt % 256; // blue value
    let g = Math.floor((colorInt % 65536) / 256); // green value
    let r = Math.floor((colorInt % 16777216) / 65536); // red value
    if ((r * 1 + g * 3 + b * 0.5) / 3 > extraThreshold) {
      // formula for determining if the color is over the threshold, green is weighted highly because it is brighter by nature
      return 2;
    } else if ((r * 1 + g * 3 + b * 0.5) / 3 > threshold) {
      return 1;
    } else {
      return 0;
    }
  }
}

export default CompanyPage;
