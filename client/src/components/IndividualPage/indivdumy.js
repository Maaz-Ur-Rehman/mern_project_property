// import React, { useRef, useState, useEffect } from "react";
// import ReactPlayer from "react-player";
// import { useParams } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./IndividualPage.css";

// import IndividualNavbar from "./IndividualNavbar.js";
// import usePopup from "../../Hooks/usePopup.js";
// import Footer from "../Footer.js";

// function IndividualPage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const aboutRef = useRef(null);
//   const galleryRef = useRef(null);
//   const planRef = useRef(null);
//   const contactRef = useRef(null);
//   const { isPopupOpen, open, close } = usePopup(); // Popup stuff moved here so that it can be accessed from outside the navbar

//   function handleAboutClick() {
//     aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//   }
//   function handleGalleryClick() {
//     galleryRef.current?.scrollIntoView({ behavior: "smooth" });
//   }
//   function handlePlanClick() {
//     planRef.current?.scrollIntoView({ behavior: "smooth" });
//   }
//   function handleContactClick() {
//     contactRef.current?.scrollIntoView({ behavior: "smooth" });
//   }

//   function toggleMenu() {
//     setIsMenuOpen(!isMenuOpen);
//   }

//   const { propertySlug } = useParams(); // THIS IS FOR THE API CALL FOR THE DYNAMIC DATA

//   // TESTING PURPOSES

//   // THEME
//   const [theme, setTheme] = useState([]);
//   useEffect(() => {
//     fetch(
//       "https://mefa-backend.herokuapp.com/company/648af197a4101715bc75980f/theme"
//     )
//       .then((response) => response.json())
//       .then((data) => setTheme(data))
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const [propertyGallerylist, setPropertyGallerylist] = useState(null);
//   useEffect(() => {
//     fetch(
//       `https://mefa-backend.herokuapp.com/images/property/648ba2ebc25c35af947f4ebf`
//     )
//       .then((response) => response.json())
//       .then((data) => setPropertyGallerylist(data));
//   }, []);

//   const [propertylist, setPropertylist] = useState(null);
//   useEffect(() => {
//     fetch(
//       "https://mefa-backend.herokuapp.com/project/646804ec2a9c4cb3da584cb4/properties"
//     )
//       .then((response) => response.json())
//       .then((data) => setPropertylist(data));
//   }, []);

//   console.log(propertylist);

//   // END OF TESTING PURPOSES

//   if (theme.length != 0) {
//     // Page won't display until dynamic data is loaded
//     var data = propertylist[0];
//     //propertylist.map((data) => {
//     console.log(data);
//     // TEMPORARY DATA TODO MAKE DYNAMIC
//     const textData = {
//       companyName: "NATURBAU",
//       info: `${data.property_type} ${data.title} ${data.city} ${data.location}`,
//       id: data._id,
//       about: data.description,
//       gallery: data.description,
//       floorPlan: data.description,
//       contact: data.description,
//     };

//     const features = [
//       // TODO make dynamic
//       { state: true, text: "INSTALLMENT AVAILABLE" },
//       { state: false, text: "READY FOR POSSESSION" },
//       { state: true, text: "EQUIPPED KITCHEN" },
//       { state: false, text: "GYM" },
//       { state: false, text: "LAUNDRY" },
//       { state: true, text: "MEDIA ROOM" },
//       { state: false, text: "BACKYARD" },
//       { state: false, text: "BASKETBALL COURT" },
//       { state: true, text: "FRONT YARD" },
//       { state: false, text: "GARAGE ATTACHED" },
//       { state: false, text: "HOT BATH" },
//       { state: false, text: "POOL" },
//       { state: false, text: "CENTRAL AIR" },
//       { state: true, text: "ELECTRICITY" },
//       { state: false, text: "HEATING" },
//       { state: false, text: "NATURAL GAS" },
//       { state: false, text: "VENTILATION" },
//       { state: true, text: "WATER" },
//       { state: true, text: "CHAIR ACCESSIBLE" },
//       { state: true, text: "SMOKE DETECTORS" },
//       { state: false, text: "WASHER AND DRYER" },
//       { state: true, text: "WIFI" },
//     ];

//     const floorData = [
//       // TODO make dynamic
//       {
//         image:
//           "https://cedreo.com/wp-content/uploads/2023/03/US_Kitchen_09_2D_332px.jpg",
//         name: "Ground Floor",
//       },
//       {
//         image:
//           "https://cedreo.com/wp-content/uploads/cloudinary/FP_Dimensions_example4_tftpde.jpg",
//         name: "First Floor",
//       },
//       {
//         image:
//           "https://cedreo.com/wp-content/uploads/cloudinary/fp_dimensions_example3.jpg",
//         name: "Second Floor",
//       },
//     ];

//     var base64Prefix = "data:image/jpeg;base64,";
//     var mergedStringImage = [];

//     for (var i = 0; i < propertyGallerylist.length; i++) {
//       mergedStringImage[i] = [base64Prefix + propertyGallerylist[i].image];
//     }

//     // console.log(mergedStringImage);

//     const galleryData = mergedStringImage;

//     const document = [{ value: "/path/to/your/file.pdf" }];

//     const specificationInfo = [
//       { value: `${data.price}\u20AC - ${data.price}\u20AC`, info: "Price" },
//       { value: `${data.area}\u00B2`, info: "TOTAL SPACE" },
//       { value: `${data.bedrooms}`, info: "BEDROOM" },
//       { value: `${data.bathrooms}`, info: "BATHROOM" },
//       { value: "1", info: "KITCHEN" },
//     ];

//     const contactInfo = [
//       {
//         name: "Roger Priegnitz",
//         number: `${data.mobile}`,
//         email: `${data.email}`,
//       },
//     ];

//     const addField = [
//       {
//         text: "One day rent",
//         state: "ture",
//       },
//     ];

//     const textShadow = colorIsBright(theme.colorHash);

//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     const dynamicData = {
//       // This is the dynamic data map object which will be passes to each component which needs dynamic data
//       propertyID: theme.property,
//       propertySlug: propertySlug,
//       color: "#006A4E", //theme.colorHash,
//       textData: textData,
//       textShadow: textShadow,
//       galleryData: galleryData,
//       floorData: floorData,
//       contactInfo: contactInfo,
//       specificationInfo: specificationInfo,
//       features: features,
//       document: document,
//       addField: addField,
//     };
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     return (
//       <div className={`home ${isMenuOpen ? "show-menu" : ""}`}>
//         <div>
//           <IndividualNavbar
//             burgerDimHandler={toggleMenu} // Burger menu toggle
//             navbarScrollHandlers={{
//               handleAboutClick,
//               handleGalleryClick,
//               handlePlanClick,
//               handleContactClick,
//             }} // Scroll to page section after click
//             pageType="individualPage"
//             dynamicData={dynamicData}
//             popupProps={{ isPopupOpen, open, close }} // Sign-in/Sign-up popup
//           />
//         </div>
//         <div className="individual">
//           {/* This contains the page content */}
//           <div>
//             <HeroImage />{" "}
//             {/* The image can be changed from the HeroImage function at the end of the code */}
//           </div>
//           <div ref={aboutRef}>
//             <HeroAbout dynamicData={dynamicData} />
//             {/* The about text can be changed from the HeroAbout function at the end of the code */}
//           </div>

//           <div ref={galleryRef}>
//             <HeroGallery dynamicData={dynamicData} />
//           </div>

//           <div ref={planRef}>
//             <HeroPlans dynamicData={dynamicData} />
//           </div>

//           <div ref={contactRef}>
//             <Contact dynamicData={dynamicData} />
//           </div>
//         </div>
//         <Footer pageType="individualPage" dynamicData={dynamicData} />
//       </div>
//     );
//     // });
//   }

//   function HeroImage() {
//     return (
//       <div className="individual-image">
//         <img
//           src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//           alt=""
//         ></img>
//       </div>
//     );
//   }

//   function HeroAbout(props) {
//     const { dynamicData } = props;

//     return (
//       <div className="individual-about">
//         <h1
//           className={dynamicData.textShadow ? "text-shadow" : ""}
//           style={{ color: dynamicData.color }}
//         >
//           {dynamicData.textData.info}
//         </h1>
//         <h3
//           className={dynamicData.textShadow ? "text-shadow" : ""}
//           style={{ color: dynamicData.color }}
//         >
//           {dynamicData.textData.id}
//         </h3>
//         <p>{dynamicData.textData.about}</p>
//       </div>
//     );
//   }

//   function HeroGallery(props) {
//     const { dynamicData } = props;

//     return (
//       <div
//         className="individual-gallery"
//         style={{ backgroundColor: dynamicData.color }}
//       >
//         <h1
//           style={{
//             color: colorIsBright(dynamicData.color) ? "black" : "white",
//           }}
//         >
//           GALLERY
//         </h1>
//         <div className="carousel">
//           <Carousel />
//         </div>
//         <p
//           style={{
//             color: colorIsBright(dynamicData.color) ? "black" : "white",
//           }}
//         >
//           {dynamicData.textData.gallery}
//         </p>
//       </div>
//     );

//     function Carousel() {
//       const settings = {
//         className: "center",
//         centerMode: true,
//         centerPadding: "0",
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         dots: true,
//       };

//       return (
//         <Slider {...settings}>
//           {dynamicData.galleryData.map((data, index) => (
//             <div key={index}>
//               {<img src={data} alt="" />}
//               {data.video && (
//                 <ReactPlayer
//                   url={data.video}
//                   controls={true}
//                   className="video"
//                 />
//               )}
//             </div>
//           ))}
//         </Slider>
//       );
//     }
//   }

//   function HeroPlans(props) {
//     const { dynamicData } = props;

//     return (
//       <div className="individual-plans">
//         <h1
//           className={dynamicData.textShadow ? "text-shadow" : ""}
//           style={{ color: dynamicData.color }}
//         >
//           FLOOR PLAN
//         </h1>
//         <p
//           style={{
//             color: colorIsBright(dynamicData.color) ? "white" : "black",
//           }}
//         >
//           {dynamicData.textData.floorPlan}
//         </p>
//         <HeroLine dynamicData={dynamicData} />
//         <div className="info-box">
//           <Information dynamicData={dynamicData} />
//         </div>
//         <HeroLine dynamicData={dynamicData} />
//         <div>
//           <Floors dynamicData={dynamicData} />
//         </div>
//         <HeroLine dynamicData={dynamicData} />
//       </div>
//     );
//   }

//   function Information(props) {
//     const { dynamicData } = props;
//     return (
//       <div
//         className={
//           "information" + (dynamicData.textShadow ? "text-shadow" : "")
//         }
//       >
//         <h1 style={{ color: dynamicData.color }}>SPECIFICATIONS</h1>
//         <div className="info-container">
//           {dynamicData.specificationInfo.map((data) => (
//             <div className="INFO" style={{ color: dynamicData.color }}>
//               <h3>{data.info}</h3>
//               <h4
//                 style={{
//                   color: colorIsBright(dynamicData.color) ? "white" : "black",
//                 }}
//               >
//                 {data.value}
//               </h4>
//             </div>
//           ))}
//         </div>
//         <h1 className="head" style={{ color: dynamicData.color }}>
//           FEATURES
//         </h1>
//         <div className="points">
//           <ul>
//             {dynamicData.features.map((item) => (
//               <li>
//                 {item.state ? (
//                   item.text
//                 ) : (
//                   <span
//                     style={{ textDecoration: "line-through", opacity: 0.7 }}
//                   >
//                     {item.text}
//                   </span>
//                 )}
//               </li>
//             ))}

//             {dynamicData.addField.map((item) => (
//               <li>
//                 {item.state ? (
//                   item.text
//                 ) : (
//                   <span
//                     style={{ textDecoration: "line-through", opacity: 0.7 }}
//                   >
//                     {item.text}
//                   </span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <h1 className="head" style={{ color: dynamicData.color }}>
//           Docunemts
//         </h1>
//         <div>
//           <div>
//             {dynamicData.document[0].value ? (
//               <a href={dynamicData.document[0].value} download>
//                 Download PDF
//               </a>
//             ) : (
//               "No document"
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   function Floors(props) {
//     const { dynamicData } = props;

//     return (
//       <div className="floor">
//         {dynamicData.floorData.map((data) => (
//           <div className="row">
//             <div className="plan">
//               <img
//                 src={data.image}
//                 style={{ borderColor: dynamicData.color }}
//               />
//             </div>
//             <div className="name">
//               <h1 style={{ color: dynamicData.color }}>{data.name}</h1>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   function HeroLine(props) {
//     const { dynamicData } = props;

//     return (
//       <div className="individual-line">
//         <span style={{ backgroundColor: dynamicData.color }} />
//       </div>
//     );
//   }

//   /* Add more object element with its data to add new results */
//   function Contact(props) {
//     const { dynamicData } = props;
//     return (
//       <div className="contact">
//         <h1
//           className={dynamicData.textShadow ? "text-shadow" : ""}
//           style={{ color: dynamicData.color }}
//         >
//           CONTACT
//         </h1>
//         <p
//           style={{
//             color: colorIsBright(dynamicData.color) ? "white" : "black",
//           }}
//         >
//           {dynamicData.textData.contact}
//         </p>
//         <div className="card-wrapper">
//           {dynamicData.contactInfo.map((data) => (
//             <div
//               className="card"
//               style={{
//                 backgroundColor: dynamicData.color,
//                 color: colorIsBright(dynamicData.color) ? "black" : "white",
//               }}
//             >
//               <h1 className="info">{data.name}</h1>
//               <h2 className="info">{data.number}</h2>
//               <h2 className="info">{data.email}</h2>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   function colorIsBright(color) {
//     const threshold = 250; // threshold for determining if color is considered bright (arbitrary)

//     let colorInt = parseInt(color.slice(1), 16);
//     let b = colorInt % 256; // blue value
//     let g = Math.floor((colorInt % 65536) / 256); // green value
//     let r = Math.floor((colorInt % 16777216) / 65536); // red value
//     if ((r * 1 + g * 3 + b * 0.5) / 3 > threshold) {
//       // formula for determining if the color is over the threshold, green is weighted highly because it is brighter by nature
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

// export default IndividualPage;
