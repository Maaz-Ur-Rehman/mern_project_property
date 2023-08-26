import React, { useEffect } from "react";
import { useState } from "react";
import { apiformdata, specificproperty, updatedashboarddata } from "../services/api";
import { json, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "antd";

export default function UpdateForm() {
  const [showPopup, setShowPopup] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("")
  const ClientId = localStorage.getItem("userId");

  const valueobject = {
    property_type: "",
    city: "",
    location: "",
    area: "",
    priceFrom: "",
    priceTo: "",
    installment: "",
    possession: "",
    bedrooms: "",
    kitchens: "",

    bathrooms: "",
    title: "",
    description: "",
    email: "",
    mobile: "",
    Landline: "",
  };

  const navigate = useNavigate()
  const location = useLocation();


  const data = location.state?.selectedRecord.SpecificProperty[0];
  const formId = data._id
  localStorage.setItem("formId", formId)


  console.log(data, "formdata")
  // console.log(formFields, "formfield")
  const [formFields, setFormFields] = useState(JSON.parse(data.fields) || []);

  const [fieldchange, setFieldChange] = useState([])

  const handleFormChange = (event, index) => {
    const updatedData = [...fieldchange];
    updatedData[index] = {
      ...updatedData[index],
      [event.target.name]: event.target.value
    };
    setFieldChange(updatedData);
  };

  console.log(fieldchange, "fdskljfdsljasklsdjaf")

  // #####################################################################

  // #####################################################################
  const [user, setUser] = useState(data || valueobject);
  const [video, setvideo] = useState();
  const [pdf, setpdf] = useState();
  const [Image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const datasimple = ['Equipped Kitchen', "Laundry"]

  console.log(user.Image, "image")


  const getimage = (e) => {
    // const file = e.target.files[0];
    setImage(e.target.files[0]);
    console.log(Image, "imageeeeeeeee")
  };
  const getvideo = (e) => {
    setvideo(e.target.files[0]);
  };
  const getpdf = (e) => {
    setpdf(e.target.files[0]);
  };
  const [utilities, setUtilities] = useState(data.utilities || []);
  const [outdoor, setOutdoor] = useState(data.outdoor || []);
  const [interior, setInterior] = useState(data.interior || []);
  const [otherfeather, setOtherfeather] = useState(data.otherfeather || []);



  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setUtilities([...utilities, value]);
    } else {
      setUtilities(utilities.filter((item) => item !== value));
    }
  };
  const handleCheckboxChangeOutdoor = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setOutdoor([...outdoor, value]);
    } else {
      setOutdoor(outdoor.filter((item) => item !== value));
    }
  };

  const handleInteriorchange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setInterior((prevInterior) => [...prevInterior, value]);
    } else {
      setInterior((prevInterior) => prevInterior.filter((item) => item !== value));
    }
  };

  const handleotherfeatherchange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setOtherfeather([...otherfeather, value]);
    } else {
      setOtherfeather(otherfeather.filter((item) => item !== value));
    }
  };

  const getvalue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

  };



  const submitform = async (e) => {
    e.preventDefault();
    console.log(interior, "interior dsdffsfsds")


    console.log(Image, "image")




    const updateformdata = new FormData();

    updateformdata.append('propertyImg', Image);
    updateformdata.append('propertyVideo', video);
    updateformdata.append('propertypdf', pdf);

    let fieldArr = []


    for (let i = 0; i < formFields.length; i++) {
      const name1 = formFields[i].fieldname
      const value = formFields[i].fieldvalue
      fieldArr.push({
        [name1]: value,

      });
      console.log(formFields[i].fieldname, formFields[i].fieldvalue)

    }
    const updatedData = {

      otherfeather: otherfeather,
      city: user.city,
      location: user.location,
      area: user.area,
      priceFrom: user.priceFrom,
      priceTo: user.priceTo,
      installment: user.installment,
      possession: user.possession,
      property_type: user.property_type,
      outdoor: outdoor,
      utilities: utilities,
      title: user.title,
      description: user.description,
      email: user.email,
      mobile: user.mobile,
      Landline: user.Landline,
      interior: interior,
      otherfeather: otherfeather,
      bedrooms: user.bedrooms,
      kitchens: user.kitchens,

      bathrooms: user.bathrooms,
      utilities: utilities,
      title: user.title,
      description: user.description,
      email: user.email,
      mobile: user.mobile,
      Landline: user.Landline,
      fields: JSON.stringify(fieldchange),
    }
    await updatedashboarddata(updatedData)
    await updatedashboarddata(updateformdata)


      .then((res) => {
        setPopupMessage("Form Successfully Updated");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigate('/properties')
        }, 3000);
        // alert("form succesfully updated")
        console.log(res, "res")
      })
      .catch((err) => {
        console.log(err, "err")
      })


  }


  return (





    <div className="app-one">


      {modalVisible && ( 
         <Modal
         title={popupMessage}
         visible={modalVisible}
         footer={null}
         closable={false}
       >
         <p>Your form has been successfully updated.</p>
       </Modal>
      )}

      <section>
        <div className="register">
          <div className="col-1" style={{ height: "100%" }}>
            <h2>Register Your Property</h2>
            <span>Register and enjoy the service</span>


            <form id="form" className="flex flex-col">
              <h4>Location & Purpose</h4>
              <hr className="border"></hr>
              <div>
                <label>Select Property Type</label>
                <input
                  type="radio"
                  id="house"
                  name="property_type"
                  value="House"
                  onChange={getvalue}
                  style={{ margin: "5px" }}
                  checked={user.property_type === "House"}
                />
                <label htmlFor="House">House</label>
                <input
                  type="radio"
                  id="flat"
                  name="property_type"
                  value="Flat"
                  onChange={getvalue}
                  style={{ margin: "5px" }}
                  checked={user.property_type === "Flat"}
                />
                <label htmlFor="Flat">Flat</label>{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={getvalue}
                value={user.city}
              />
              <input
                type="text"
                placeholder="Location"
                name="location"
                onChange={getvalue}
                value={user.location}
              />
              <h4>Price & Area</h4>
              <span style={{ color: "red", fontSize: "20px" }}>*</span>
              <hr className="border"></hr>

              <input
                type="number"
                placeholder="Area Size"
                name="area"
                onChange={getvalue}
                value={user.area}
              />
              <input
                type="number"
                placeholder="Price From"
                name="priceFrom"
                onChange={getvalue}
                value={user.priceFrom}

              />
              <input
                type="number"
                placeholder="Price To"
                name="priceTo"
                onChange={getvalue}
                value={user.priceTo}
              />

              <div>
                <label>Installment Available</label>
                <input
                  type="radio"
                  id="yes"
                  name="installment"
                  value="Yes"
                  onChange={getvalue}
                  style={{ margin: "5px" }}
                  checked={user.installment === "Yes"}
                />
                <label htmlFor="Yes">Yes</label>
                <input
                  type="radio"
                  id="no"
                  name="installment"
                  value="No"
                  onChange={getvalue}
                  style={{ margin: "5px" }}
                  checked={user.installment === "No"}
                />
                <label htmlFor="No">No</label>

              </div>
              <div>
                <label>Ready For Possession</label>
                <input
                  type="radio"
                  id="yes"
                  name="possession"
                  value="Yes"
                  onChange={getvalue}
                  style={{ margin: "5px" }}
                  checked={user.possession === "Yes"}

                />
                <label htmlFor="Yes">Yes</label>
                <input
                  type="radio"
                  id="no"
                  name="possession"
                  value="No"
                  onChange={getvalue}
                  style={{ margin: "5px" }}
                  checked={user.possession === "No"}
                />
                <label htmlFor="No">No</label>
              </div>
              <h4>Features & Amenities</h4>
              <hr className="border"></hr>

              <input
                type="number"
                placeholder="Bedrooms"
                name="bedrooms"
                onChange={getvalue}
                value={user.bedrooms}
              />
              <input
                type="number"
                placeholder="Bathrooms"
                name="bathrooms"
                onChange={getvalue}
                value={user.bathrooms}
              />
              <input
                type="number"
                placeholder="Kitchens"
                name="kitchens"
                onChange={getvalue}
                value={user.kitchens}
              />
              <h4>Interior Details</h4>

              <div>
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="interiorDetails1"
                    name="equippedKitchen"
                    value="Equipped Kitchen"
                    style={{ marginRight: "10px" }}
                    onChange={handleInteriorchange}
                    checked={interior.includes("Equipped Kitchen")}
                  />
                  <label htmlFor="interiorDetails1" style={{ marginRight: "25px" }}>
                    Equipped Kitchen
                  </label>

                  <input
                    type="checkbox"
                    id="interiorDetails2"
                    name="gym"
                    value="Gym"
                    style={{ marginRight: "10px" }}
                    onChange={handleInteriorchange}
                    checked={interior.includes("Gym")}
                  />
                  <label htmlFor="interiorDetails2" style={{ marginRight: "25px" }}>
                    Gym
                  </label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="interiorDetails3"
                    name="laundry"
                    value="Laundry"
                    style={{ marginRight: "10px" }}
                    onChange={handleInteriorchange}
                    checked={interior.includes("Laundry")}
                  />
                  <label htmlFor="interiorDetails3" style={{ marginRight: "25px" }}>
                    Laundry
                  </label>

                  <input
                    type="checkbox"
                    id="interiorDetails4"
                    name="mediaRoom"
                    value="Media Room"
                    style={{ marginRight: "10px" }}
                    onChange={handleInteriorchange}
                    checked={interior.includes("Media Room")}
                  />
                  <label htmlFor="interiorDetails4" style={{ marginRight: "25px" }}>
                    Media Room
                  </label>
                </div>

              </div>
              <h4>Outdoor Details</h4>

              <div>
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="outdoorDetails1"
                    name="backyard"
                    value="Backyard"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor}
                    checked={outdoor.includes("Backyard")}
                  />
                  <label
                    htmlFor="outdoorDetails1"
                    style={{ marginRight: "25px" }}
                  >
                    {" "}
                    Backyard
                  </label>

                  <input
                    type="checkbox"
                    id="outdoorDetails2"
                    name="basketballCourt"
                    value="Basketball court"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor}
                    // checked={user.outdoor.includes('Basketball court')}
                    checked={outdoor.includes("Basketball court")}

                  />
                  <label
                    htmlFor="outdoorDetails2"
                    style={{ marginRight: "25px" }}
                  >
                    {" "}
                    Basketball Court
                  </label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="outdoorDetails3"
                    name="frontYard"
                    value="Front yard"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor}
                    // checked={user.outdoor.includes('Front yard')}
                    checked={outdoor.includes("Front yard")}

                  />
                  <label
                    htmlFor="outdoorDetails3"
                    style={{ marginRight: "25px" }}
                  >
                    {" "}
                    Front yard
                  </label>

                  <input
                    type="checkbox"
                    id="outdoorDetails4"
                    name="garageAttached"
                    value="Garage Attached"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor}
                    // checked={user.outdoor.includes('Garage Attached')}
                    checked={outdoor.includes("Garage Attached")}

                  />
                  <label
                    htmlFor="outdoorDetails4"
                    style={{ marginRight: "25px" }}
                  >
                    {" "}
                    Garage Attached
                  </label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="outdoorDetails5"
                    name="hotBath"
                    value="Hot Bath"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor}
                    // checked={user.outdoor.includes('Hot Bath')}
                    checked={outdoor.includes("Hot Bath")}

                  />
                  <label
                    htmlFor="outdoorDetails5"
                    style={{ marginRight: "25px" }}
                  >
                    {" "}
                    Hot Bath
                  </label>

                  <input
                    type="checkbox"
                    id="outdoorDetails6"
                    name="pool"
                    value="Pool"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor}
                    // checked={user.outdoor.includes('Pool')}
                    checked={outdoor.includes("Pool")}

                  />
                  <label
                    htmlFor="outdoorDetails6"
                    style={{ marginRight: "25px" }}
                  >
                    {" "}
                    Pool
                  </label>
                </div>
              </div>

              <h4>Utilities</h4>

              <div>
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="utility1"
                    name="centralAir"
                    value="Central Air"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChange}
                    // checked={user.utilities.includes('Central Air')}
                    checked={utilities.includes('Central Air')}

                  />
                  <label htmlFor="utility1" style={{ marginRight: "25px" }}>
                    Central Air
                  </label>

                  <input
                    type="checkbox"
                    id="utility2"
                    name="electricity"
                    value="Electricity"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChange}
                    // checked={user.utilities.includes('Electricity')}
                    checked={utilities.includes('Electricity')}

                  />
                  <label htmlFor="utility2" style={{ marginRight: "25px" }}>
                    Electricity
                  </label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="utility3"
                    name="heating"
                    value="Heating"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChange}
                    // checked={user.utilities.includes('Heating')}
                    checked={utilities.includes('Heating')}

                  />
                  <label htmlFor="utility3" style={{ marginRight: "25px" }}>
                    Heating
                  </label>

                  <input
                    type="checkbox"
                    id="utility4"
                    name="naturalGas"
                    value="Natural Gas"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChange}
                    // checked={user.utilities.includes('Natural Gas')}
                    checked={utilities.includes('Natural Gas')}

                  />
                  <label htmlFor="utility4" style={{ marginRight: "25px" }}>
                    Natural Gas
                  </label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="utility5"
                    name="ventilation"
                    value="Ventilation"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChange}
                    // checked={user.utilities.includes('Ventilation')}
                    checked={utilities.includes('Ventilation')}

                  />
                  <label htmlFor="utility5" style={{ marginRight: "25px" }}>
                    Ventilation
                  </label>

                  <input
                    type="checkbox"
                    id="utility6"
                    name="water"
                    value="Water"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChange}
                    // checked={user.utilities.includes('Water')}
                    checked={utilities.includes('Water')}

                  />
                  <label htmlFor="utility6" style={{ marginRight: "25px" }}>
                    Water
                  </label>
                </div>
              </div>

              <h4>Other Features</h4>

              <div>
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="feature1"
                    name="chairAccessible"
                    value="Chair Accessible"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange}
                    // checked={user.otherfeather.includes('Chair Accessible')}
                    checked={otherfeather.includes('Chair Accessible')}
                  />
                  <label htmlFor="feature1" style={{ marginRight: "25px" }}>
                    {" "}
                    Chair Accessible
                  </label>

                  <input
                    type="checkbox"
                    id="feature2"
                    name="elevator"
                    value="Elevator"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange}
                    // checked={user.otherfeather.includes('Elevator')}
                    checked={otherfeather.includes('Elevator')}

                  />
                  <label htmlFor="feature2" style={{ marginRight: "25px" }}>
                    {" "}
                    Elevator
                  </label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="feature3"
                    name="fireplace"
                    value="Fireplace"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange}
                    // checked={user.otherfeather.includes('Fireplace')}
                    checked={otherfeather.includes('Fireplace')}

                  />
                  <label htmlFor="feature3" style={{ marginRight: "25px" }}>
                    {" "}
                    Fireplace
                  </label>

                  <input
                    type="checkbox"
                    id="feature4"
                    name="smokeDetectors"
                    value="Smoke Detectors"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange}
                    // checked={user.otherfeather.includes('Smoke Detectors')}
                    checked={otherfeather.includes('Smoke Detectors')}

                  />
                  <label htmlFor="feature4" style={{ marginRight: "25px" }}>
                    {" "}
                    Smoke Detectors
                  </label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="feature5"
                    name="washerAndDryer"
                    value="Washer and dryer"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange}
                    // checked={user.otherfeather.includes('Washer and dryer')}
                    checked={otherfeather.includes('Washer and dryer')}

                  />
                  <label htmlFor="feature5" style={{ marginRight: "25px" }}>
                    {" "}
                    Washer and dryer
                  </label>

                  <input
                    type="checkbox"
                    id="feature6"
                    name="wifi"
                    value="WiFi"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange}
                    // checked={user.otherfeather.includes('WiFi')}
                    checked={otherfeather.includes('WiFi')}

                  />
                  <label htmlFor="feature6" style={{ marginRight: "25px" }}>
                    {" "}
                    WiFi
                  </label>
                </div>
              </div>

              <h4>Ad Information</h4>
              <hr className="border"></hr>

              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={getvalue}
                value={user.title}
              />

              <div>
                <label htmlFor="description">Description</label>

                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  onChange={getvalue}
                  value={user.description}
                ></textarea>
              </div>

              <h4>Property Images & Videos</h4>
              <hr className="border"></hr>

              <label htmlFor="propertyImg">Property Image</label>
              <input type='file' placeholder='Property Image' name='propertyImg' accept="image/*" onChange={getimage} />

              {/* {user.Image && <img src={user.Image} alt="Preview" />} */}

              <label htmlFor="propertyVideo">Property Video</label>
              <input
                type="file"
                placeholder="Property Video"
                name="propertyVideo"
                accept="video/*"
                onChange={getvideo}
              />

              <label htmlFor="propertyVideo">Property PDF</label>
              <input
                type="file"
                placeholder="Property PDF"
                name="propertypdf"
                accept="application/pdf"
                onChange={getpdf}
              />

              <h4>Contact Information</h4>
              <hr className="border"></hr>

              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={getvalue}
                value={user.email}
              />
              <input
                type="tel"
                placeholder="Mobile"
                name="mobile"
                onChange={getvalue}
                value={user.mobile}
              />
              <input
                type="tel"
                placeholder="Landline"
                name="Landline"
                onChange={getvalue}
                value={user.Landline}
              />

              {
                <>
                  <h4>More Information</h4>
                  <div>

                    {formFields.map((item, index) => (
                      <div key={index}>
                        {Object.entries(item).map(([fieldName, fieldValue]) => (
                          <div key={fieldName}>
                            {/* <label>{fieldName}: </label> */}
                            <input
                              className='dynamic-input'
                              name={fieldName}
                              placeholder={`Enter Your ${fieldName}`}
                              // value={fieldchange[index]?.[fieldValue] || ''}
                              // value={formFields.map((e,i)=>(formFields[i]))}
                              onChange={event => handleFormChange(event, index)}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              }



              {/* ######################################################################################## */}


              <button className="btn" onClick={submitform}>
                Register
              </button>
            </form>

          </div>
          <div className="col-2"></div>
        </div>
      </section>




    </div>

  );
}

// function Popup({ message, onClose }) {
//   setTimeout(() => {
//     onClose();
//   }, 3000); // Automatically close the popup after 3 seconds

//   return (
//     <div className="popup">
//       <div className="popup-content">
//         <p>{message}</p>
//         <button onClick={onClose}>OK</button>
//       </div>
//     </div>
//   );
// }


