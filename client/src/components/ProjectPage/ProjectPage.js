import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProjectPage.css";

import ProjectNavbar from "./ProjectNavbar.js";
import usePopup from "../../Hooks/usePopup.js";
import Footer from "../Footer.js";
import ImageSlider from "./ImageSlider";

import company_logo from "../../images/Company_01_Logo.png";
import mid from "../../images/mid-company.png";
import school from "../../images/icons/school.png"
import hospital from "../../images/icons/hospital.png"
import pray from "../../images/icons/pray.png"
import basket from "../../images/icons/basket.png"
import forest from "../../images/icons/forest.png"
import dumbbell from "../../images/icons/dumbbell.png"

function ProjectPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const searchRef = useRef(null);
  const { isPopupOpen, open, close } = usePopup(); // Popup stuff moved here so that it can be accessed from outside the navbar

  function handleAboutClick() {
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function handleGalleryClick() {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  function handleSearchClick() {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const { companyName, projectName } = useParams(); // THIS IS FOR THE API CALL FOR THE DYNAMIC DATA

  // TESTING PURPOSES

  // THEME
  const [theme, setTheme] = useState([]);
  useEffect(() => {
    fetch('https://mefa-backend.herokuapp.com/company/646804eb2a9c4cb3da584cab/theme')
      .then(response => response.json())
      .then(data => setTheme(data))
      .catch(error => {
        console.error(error);
      });
  }, []);

  // END OF TESTING PURPOSES

	if (theme.length != 0) {
		// Page won't display until dynamic data is loaded

    // TEMPORARY DATA TODO MAKE DYNAMIC
    const textData = {
      "companyName": "NATURBAU",
      "welcome": "HERZLICH WILLKOMMEN BEI NATURBAU MELDORF",
      "about": "Seit über 30 Jahren bauen wir ökologische Holzhäuser aus natürlichen" +
        "Materialien. Zum Wohl Ihrer Gesundheit. Nutzen Sie unsere Erfahrung –" +
        "erschaffen Sie mit uns Ihr wohngesundes Wohlfühl-Zuhause" +
        "Unsere Häuser sind so individuell wie Sie. Design, Größe und" +
        "Austattung – zusammen passen wir Ihr Haus an Ihre Bedürfnisse an." +
        "Gestalten es genau nach Ihren Wünschen. Dass das nicht viel teurer" +
        "sein muss als ein Öko-Haus aus dem Katalog, zeigen wir Ihnen gerne.",
      "location": "Lorem ipsum dolor sit amet, consectetur adipiscing elit." + 
        "Praesent vulputate augue vel quam pulvinar, et elementum metus pretium. " +
        "Vestibulum consectetur vestibulum erat sed lobortis. Mauris nec egestas sapien. Pellentesque at elit tristique",
      "gallery": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Praesent vulputate augue vel quam pulvinar, et elementum metus pretium. " +
        "Vestibulum consectetur vestibulum erat sed lobortis. Mauris nec egestas sapien. Pellentesque at elit tristique"
    }

    const textShadow = colorIsBright(theme.colorHash);

    const dynamicData = { // This is the dynamic data map object which will be passes to each component which needs dynamic data
      companyID: theme.company,
      companySlug: companyName,
      color: theme.colorHash,
      textData: textData,
      textShadow: textShadow,
    };
	
		return (
			<div className={`home ${isMenuOpen ? "show-menu" : ""}`}>
				<div>
					<ProjectNavbar
						burgerDimHandler={toggleMenu} // Burger menu toggle
						navbarScrollHandlers={{
							handleAboutClick,
							handleGalleryClick,
							handleSearchClick,
						}} // Scroll to page section after click
						pageType="projectPage"
						dynamicData={dynamicData}
						popupProps={{ isPopupOpen, open, close }} // Sign-in/Sign-up popup
					/>
				</div>
				<div className="project">
					{/* This contains the page content */}
					<div>
						<HeroImage />{" "}
						{/* The image can be changed from the HeroImage function at the end of the code */}
					</div>
					<div>
						<Logo />{" "}
						{/* The logo image can be changed from the Logo function at the end of the code */}
					</div>
					<div ref={aboutRef}>
						<HeroAbout dynamicData={dynamicData}/>
						{/* The about text can be changed from the HeroAbout function at the end of the code */}
					</div>
					<HeroLine color={dynamicData.color} />
					<div>
						<HeroLocation dynamicData={dynamicData} />{" "}
						{/* The number of Cards and its contents can be changed from the FeatureCards function at the end of the code */}
					</div>
          <div ref={galleryRef}>
					  <HeroGallery dynamicData={dynamicData} />
          </div>
					<div ref={searchRef}>
						<MidImage />
						{/* The Midpage image can be changed from the MidImage function at the end of the code (!) TODO DYNAMIC */}
					</div>
					<div>
						<HeroSearch color={dynamicData.color} textShadow={dynamicData.textShadow}/>
					</div>
					<div>
						<Results dynamicData={dynamicData} />{" "}
						{/* The number of resutls and its contents can be changed from the Results function at the end of the code */}
					</div>
				</div>
				<Footer pageType="companyPage" dynamicData={dynamicData} />
			</div>
		);

	}
  

  function HeroImage() {
    return (
      <div className="project-image">
        <img src="https://fastly.picsum.photos/id/1075/2000/1000.jpg?hmac=R9chehIPShFjuCnJNRlOSjVTQKqrJ_QAKwH9V0fbx0M" alt=""></img>
      </div>
    );
  }

  function Logo() {
    return (
      <div className="project-logo">
        <img src={company_logo} alt=""></img>
      </div>
    );
  }

  function HeroAbout(props) {
    const {dynamicData} = props;
    
    return (
      <div className="project-about">
        <h1 className={dynamicData.textShadow ? "text-shadow" : ""} style={{color: dynamicData.color}}>{dynamicData.textData.welcome}</h1>
        <p>{dynamicData.textData.about}</p>
      </div>
    );
  }

  function HeroLine(props) {
    const {dynamicData} = props;

    return (
      <div className="project-line">
        <span style={{"backgroundColor": props.color}}/>
      </div>
    );
  }

  function HeroLocation(props) {
    const {dynamicData} = props

    // Data for nearby amenities, all except icons should be dynamic
    const Data = [
      {
        key: 0,
        icon: school,
        color: dynamicData.color,
        num: 2 // TODO make dynamic
      },
      {
        key: 1,
        icon: hospital,
        color: dynamicData.color,
        num: 1 // TODO make dynamic
      },
      {
        key: 2,
        icon: pray,
        color: dynamicData.color,
        num: 5 // TODO make dynamic
      },
      {
        key: 3,
        icon: basket,
        color: dynamicData.color,
        num: 8 // TODO make dynamic
      },
      {
        key: 4,
        icon: forest,
        color: dynamicData.color,
        num: 2 // TODO make dynamic
      },
      {
        key: 5,
        icon: dumbbell,
        color: dynamicData.color,
        num: 1 // TODO make dynamic
      },
    ]

    function amenities(data) {
      return (
        <Amenity 
          key={data.key}
          icon={data.icon}
          num={data.num}
        />
      );
    }
    function Amenity(props) {
      // TODO make this fit the color scheme, probably needs SVG icons
      return (
        <div className="amenity">
          <img src={props.icon} alt="" />
          <p>{props.num}</p>
        </div>
      );
    }

    return (
      <div className="project-location">
        <h1 className={dynamicData.textShadow ? "text-shadow" : ""} style={{color: dynamicData.color}}>LOCATION</h1>
        <p className="description">{dynamicData.textData.location}</p>
        {/* TODO location on map */}
        <div className="nearby-amenities">{Data.map(amenities)}</div>
      </div>
    );
  }

  function HeroGallery(props) {
    const {dynamicData} = props;

    return (
      <div className="project-gallery" style={{"backgroundColor": dynamicData.color}}>
        <h1 style={{color: colorIsBright(dynamicData.color) ? "black" : "white"}}>GALLERY</h1>
        <div className="carousel">
          <Carousel />
        </div>
        <p style={{color: colorIsBright(dynamicData.color) ? "black" : "white"}}>{dynamicData.textData.gallery}</p>
      </div>
    )

    function Carousel() {

      const Data = [ // TODO make dynamic
        {
          image: "https://picsum.photos/1200/800?random=345"
        },
        {
          image: "https://picsum.photos/1200/800?random=346"
        },
        {
          image: "https://picsum.photos/1200/800?random=347"
        },
      ]

      const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "0",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        dots: true,
      }

      return (
        <Slider {...settings}>
          {Data.map(data => (
            <div key={data}>
              <img src={data.image} alt="" />
            </div>
          ))}
        </Slider>
      )
    }
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
      <div className={"project-search" + (props.textShadow ? " text-shadow-s-blur" : "")} style={{"color": props.color}}>
        <h2 className="search-header">REAL ESTATE, APARTMENTS, HOUSES</h2>
        <SearchForm color={props.color} textShadow={props.textShadow}/>
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
        <div className="project-form-inputs">
          <div className="project-form-field">
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
          <div className="project-form-field">
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
        <div className="project-form-options">
          <div className="search-button float-end">
            <button className={props.textShadow ? "text-shadow-s" : ""} type="submit" style={{"backgroundColor": props.color}}>SEARCH</button>
          </div>
        </div>
      </form>
    );
  }

  /* Add more object element with its data to add new results */
  function Results(props) {
    const {dynamicData} = props;
    const Data = [
      {
        key: 1,
        images: [
          "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
          "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
          "https://www.baufritz.com/01_Haeuser/Kundenh%C3%A4user/2019/Richter/Bilder/247/image-thumb__247__hero/-8585855483413193058.jpg",
        ],
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, " +
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
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, " +
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

  function optimizeTextColor(textColor) { // UNUSED
    const divisor = 2; // divisor for the colors in case of darkening (higher value means darker color)

    // If color is too bright for text, darken it
    if (colorIsBright(textColor)) {
      let textColorInt = parseInt(textColor.slice(1), 16);
      let b = textColorInt % 256; // blue value
      let g = Math.floor(textColorInt % 65536 / 256); // green value
      let r = Math.floor(textColorInt % 16777216 / 65536); // red value
      r = Math.floor(r / divisor); g = Math.floor(g / divisor); b = Math.floor(b / divisor); // reduce values
      textColorInt = (r * 65536) + (g *  256) + b; // rebuild hex string
      textColor = '#';
      if (r <= 0) {
        textColor += "00";
        if (g <= 0) {
          textColor += "00";
        }
      }
      textColor += textColorInt.toString(16);
    }
    return textColor;
  }

  function colorIsBright(color) {
    const threshold = 250; // threshold for determining if color is considered bright (arbitrary)
    
    let colorInt = parseInt(color.slice(1), 16);
    let b = colorInt % 256; // blue value
    let g = Math.floor(colorInt % 65536 / 256); // green value
    let r = Math.floor(colorInt % 16777216 / 65536); // red value
    if ((r*1 + g*3 + b*0.5) / 3 > threshold) { // formula for determining if the color is over the threshold, green is weighted highly because it is brighter by nature
      return true;
    }
    else {
      return false;
    }
  }
}

export default ProjectPage;
