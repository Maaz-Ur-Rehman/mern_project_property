import React, { useRef, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./IndividualPage.css";

import IndividualNavbar from "./IndividualNavbar.js";
import usePopup from "../../Hooks/usePopup.js";
import Footer from "../Footer.js";
import { GetallApproveProperty } from "../../services/api";

function IndividualPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const planRef = useRef(null);
  const contactRef = useRef(null);
  const { isPopupOpen, open, close } = usePopup(); // Popup stuff moved here so that it can be accessed from outside the navbar

  function handleAboutClick() {
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function handleGalleryClick() {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  function handleSearchClick() {
    planRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  function handleSearchClick() {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // const { companyName, individualName } = useParams(); // THIS IS FOR THE API CALL FOR THE DYNAMIC DATA
  

    const {propertySlug}=useParams()

  // const location = useLocation();
  // const { property } = location.state;





  // console.log(property,"propertyData")


  // TESTING PURPOSES

  // THEME
  const [theme, setTheme] = useState([]);
  // useEffect(() => {
  //   fetch(
  //     "https://mefa-backend.herokuapp.com/company/646804eb2a9c4cb3da584cab/theme"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setTheme(data))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // END OF TESTING PURPOSES
  const [propertyList, setPropertyList] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
      const data = await GetallApproveProperty();
      const datas=data.approvalProperties
      setPropertyList(datas);
      console.log(datas, "allapprove data");
    } catch (error) {
      console.error(error);
    }
  };

  getData();
}, []);


  let propertyData=null;


  if (propertyList) {
    for (let i = 0; i < propertyList.length; i++) {
      if (propertyList[i]._id === propertySlug) {
        propertyData = propertyList[i];
        break;
      }
    }
  }


  console.log(propertyData,"propertyDatasssssssssss")



  if (propertyData && propertyList) {
    // Page won't display until dynamic data is loaded

    // TEMPORARY DATA TODO MAKE DYNAMIC
    const textData = {
      companyName: "NATURBAU",
      info: propertyData.location,
      id: propertyData.ClientId,
      about:propertyData.description,
        // "Seit über 30 Jahren bauen wir ökologische Holzhäuser aus natürlichen" +
        // "Materialien. Zum Wohl Ihrer Gesundheit. Nutzen Sie unsere Erfahrung –" +
        // "erschaffen Sie mit uns Ihr wohngesundes Wohlfühl-Zuhause" +
        // "Unsere Häuser sind so individuell wie Sie. Design, Größe und" +
        // "Austattung – zusammen passen wir Ihr Haus an Ihre Bedürfnisse an." +
        // "Gestalten es genau nach Ihren Wünschen. Dass das nicht viel teurer" +
        // "sein muss als ein Öko-Haus aus dem Katalog, zeigen wir Ihnen gerne.",
      gallery:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Praesent vulputate augue vel quam pulvinar, et elementum metus pretium. " +
        "Vestibulum consectetur vestibulum erat sed lobortis. Mauris nec egestas sapien. Pellentesque at elit tristique",
      floorPlan:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam" +
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam",
      contact:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Praesent vulputate augue vel quam pulvinar, et elementum metus pretium. " +
        "Vestibulum consectetur vestibulum erat sed lobortis. Mauris nec egestas sapien. Pellentesque at elit tristique",
    };

    const features = [
      { state: propertyData.installment, text: "INSTALLMENT AVAILABLE: " },
      { state: propertyData.possession, text: "READY FOR POSSESSION: " },
    ];

    const floorData = [
      {
        image:
          "https://cedreo.com/wp-content/uploads/2023/03/US_Kitchen_09_2D_332px.jpg",
        name: "Ground Floor",
      },
      {
        image:
          "https://cedreo.com/wp-content/uploads/cloudinary/FP_Dimensions_example4_tftpde.jpg",
        name: "First Floor",
      },
      {
        image:
          "https://cedreo.com/wp-content/uploads/cloudinary/fp_dimensions_example3.jpg",
        name: "Second Floor",
      },
    ];

    // console.log(property.priceTo,"priceTo")

    const specificationInfo = [
      { value: propertyData.priceTo, info: "PRICE" },
      { value: propertyData.area, info: "TOTAL SPACE" },
      { value: propertyData.bedrooms, info: "BEDROOM" },
      { value: propertyData.bathrooms, info: "BATHROOM" },
      { value: propertyData.kitchens, info: "KITCHEN" },
    ];


    console.log(specificationInfo,"specificatoninfo")

    const contactInfo = [
      {
        name: propertyData.title,
        number: propertyData.Landline,
        email: propertyData.email,
      },
      // {
     //   name: "Roger Priegnitz",
      //   number: "+49 000 000 000",
      //   email: "hartmann@realestate.de",
      // },
      // {
      //   name: "Roger Priegnitz",
      //   number: "+49 000 000 000",
      //   email: "hartmann@realestate.de",
      // },
    ];
    const textShadow = colorIsBright("#006A4E");

    const dynamicData = {
      // This is the dynamic data map object which will be passes to each component which needs dynamic data
      companyID: theme.company,
      // companySlug: companyName,  
      color: "#006A4E", //theme.colorHash
      textData: textData,
      textShadow: textShadow,
      floorData: floorData,
      contactInfo: contactInfo,
      specificationInfo: specificationInfo,
      features: features,
      propertyData:propertyData      
    };


    console.log(dynamicData,"dynamicadata")

    return (
      <div className={`home ${isMenuOpen ? "show-menu" : ""}`}>
        <div>
          <IndividualNavbar
            burgerDimHandler={toggleMenu} // Burger menu toggle
            navbarScrollHandlers={{
              handleAboutClick,
              handleGalleryClick,
              handleSearchClick,
            }} // Scroll to page section after click
            pageType="individualPage"
            dynamicData={dynamicData}
            popupProps={{ isPopupOpen, open, close }} // Sign-in/Sign-up popup
          />
        </div>
        <div className="individual">
          {/* This contains the page content */}
          <div>
            <HeroImage />{" "}
            {/* The image can be changed from the HeroImage function at the end of the code */}
          </div>
          <div ref={aboutRef}>
            <HeroAbout dynamicData={dynamicData} />
            {/* The about text can be changed from the HeroAbout function at the end of the code */}
          </div>

          <div ref={galleryRef}>
            <HeroGallery dynamicData={dynamicData} />
          </div>

          <div ref={planRef}>
            <HeroPlans dynamicData={dynamicData} />
          </div>
          <div ref={contactRef}>
            <Contact dynamicData={dynamicData} />
          </div>
        </div>
        <Footer pageType="companyPage" dynamicData={dynamicData} />
      </div>
    );
  }

  function HeroImage() {
    return (
      <div className="individual-image">
        <img
          src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        ></img>
      </div>
    );
  }

  function HeroAbout(props) {
    const { dynamicData } = props;

    return (
      <div className="individual-about">
        <h1
          className={dynamicData.textShadow ? "text-shadow" : ""}
          style={{ color: dynamicData.color }}
        >
          {dynamicData.textData.info}
        </h1>
        <h3
          className={dynamicData.textShadow ? "text-shadow" : ""}
          style={{ color: dynamicData.color }}
        >
          {dynamicData.textData.id}
        </h3>
        <p>{dynamicData.textData.about}</p>
      </div>
    );
  }

  function HeroGallery(props) {
    const { dynamicData } = props;

    return (
      <div
        className="individual-gallery"
        style={{ backgroundColor: dynamicData.color }}
      >
        <h1
          style={{
            color: colorIsBright(dynamicData.color) ? "black" : "white",
          }}
        >
          GALLERY
        </h1>
        <div className="carousel">
          <Carousel />
        </div>
        <p
          style={{
            color: colorIsBright(dynamicData.color) ? "black" : "white",
          }}
        >
          {dynamicData.textData.gallery}
        </p>
      </div>
    );

    function Carousel() {
      const Data = [
        // TODO make dynamic
        {
          image:`http://localhost:7000/uploads/${propertyData.Image}` ,
        },
        // {
        //   image: "https://picsum.photos/1200/800?random=346",
        // },
        // {
        //   image: "https://picsum.photos/1200/800?random=347",
        // },
      ];

      const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "0",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        dots: true,
      };

      return (
        <Slider {...settings}>
          {Data.map((data) => (
            <div key={data}>
              <img src={data.image} alt="" />
            </div>
          ))}
        </Slider>
      );
    }
  }

  function HeroPlans(props) {
    const { dynamicData } = props;

    return (
      <div className="individual-plans">
        <h1
          className={dynamicData.textShadow ? "text-shadow" : ""}
          style={{ color: dynamicData.color }}
        >
          FLOOR PLAN
        </h1>
        <p
          style={{
            color: colorIsBright(dynamicData.color) ? "white" : "black",
          }}
        >
          {dynamicData.textData.floorPlan}
        </p>
        <HeroLine dynamicData={dynamicData} />
        <div className="info-box">
          <Information dynamicData={dynamicData} />
        </div>
        <HeroLine dynamicData={dynamicData} />
        <div>
          <Floors dynamicData={dynamicData} />
        </div>
        <HeroLine dynamicData={dynamicData} />
      </div>
    );
  }

  function Information(props) {
    const { dynamicData } = props;
    return (
      <div
        className={
          "information" + (dynamicData.textShadow ? "text-shadow" : "")
        }
      >
        <h1 style={{ color: dynamicData.color }}>SPECIFICATIONS</h1>

        <div className="info-container">
          {dynamicData.specificationInfo.map((data) => (
            <div className="INFO" style={{ color: dynamicData.color }}>
              <h3>{data.info}</h3>
              <h4
                style={{
                  color: colorIsBright(dynamicData.color) ? "white" : "black",
                }}
              >
                {data.value}
              </h4>
            </div>
          ))}
        </div>

        <h3 className="head" style={{ color: dynamicData.color }}>
          FEATURES:
        </h3>
        <div className="points">
          <ul>
            {" "}
            {dynamicData.features.map((item) => (
              <li>
                {item.text} {item.state ? "YES" : "NO"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function Floors(props) {
    const { dynamicData } = props;

    return (
      <div className="floor">
        {dynamicData.floorData.map((data) => (
          <div className="row">
            <div className="plan">
              <img
                src={data.image}
                style={{ borderColor: dynamicData.color }}
              />
            </div>
            <div className="name">
              <h1 style={{ color: dynamicData.color }}>{data.name}</h1>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function HeroLine(props) {
    const { dynamicData } = props;

    return (
      <div className="individual-line">
        <span style={{ backgroundColor: dynamicData.color }} />
      </div>
    );
  }

  /* Add more object element with its data to add new results */
  function Contact(props) {
    const { dynamicData } = props;
    return (
      <div className="contact">
        <h1
          className={dynamicData.textShadow ? "text-shadow" : ""}
          style={{ color: dynamicData.color }}
        >
          CONTACT
        </h1>
        <p
          style={{
            color: colorIsBright(dynamicData.color) ? "white" : "black",
          }}
        >
          {dynamicData.textData.contact}
        </p>
        <div className="card-wrapper">
          {dynamicData.contactInfo.map((data) => (
            <div
              className="card"
              style={{
                backgroundColor: dynamicData.color,
                color: colorIsBright(dynamicData.color) ? "black" : "white",
              }}
            >
              <h1 className="info">{data.name}</h1>
              <h2 className="info">{data.number}</h2>
              <h2 className="info">{data.email}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
  function colorIsBright(color) {
    const threshold = 250; // threshold for determining if color is considered bright (arbitrary)

    let colorInt = parseInt(color.slice(1), 16);
    let b = colorInt % 256; // blue value
    let g = Math.floor((colorInt % 65536) / 256); // green value
    let r = Math.floor((colorInt % 16777216) / 65536); // red value
    if ((r * 1 + g * 3 + b * 0.5) / 3 > threshold) {
      // formula for determining if the color is over the threshold, green is weighted highly because it is brighter by nature
      return true;
    } else {
      return false;
    }
  }
}

export default IndividualPage;
