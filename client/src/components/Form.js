
import React, { useEffect } from 'react';
import { useState } from 'react';
import { apiformdata, specificCompany } from '../services/api';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function Form() {
  
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
  const  ClientId=  localStorage.getItem('userId')
  console.log(ClientId,"clientId")


  const [utilities, setUtilities] = useState([]);
  const [outdoor, setOutdoor] = useState([]);
  const [interior, setInterior] = useState([]);
  const [otherfeather, setOtherfeather] = useState([]);
  const [modalVisible,setModalVisible]=useState(false)

  const navigate=useNavigate()
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
    console.log(checked, "checked");
    if (checked) {
      setInterior([...interior, value]);
    } else {
      setInterior(interior.filter((item) => item !== value));
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

  const [user, setUser] = useState(valueobject);
  const [Image, setImage] = useState();
  const [video, setVideo] = useState();
  const [pdf, setPdf] = useState();

  const getimage = (e) => {
    setImage(e.target.files[0]);
    console.log(Image,"iamge")
  };

  const getvideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const getpdf = (e) => {
    setPdf(e.target.files[0]);
  };

  const [formFields, setFormFields] = useState([]);

  const handleFormChange = (event, index) => {
    const data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const addFields = () => {
    const object = {
      fieldname: "",
      fieldvalue: ""
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    const data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const getvalue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

const[companyId,setCompanyId]=useState('')

  useEffect(() => {
    const GetCompanyData = async () => {
      const result = await specificCompany();
      console.log(result,"result");
      const results = result.company;
      const customers = results.map((e) => ({
        Id : e._id,
        
      }));
      setCompanyId(customers[0].Id)
      // console.log(customers[0].Id)
    };
    GetCompanyData();
  }, []);
  console.log(companyId,"companyId")
  const submitform = async (e) => {
    e.preventDefault();
  // console.log(clientId,'cleidnId')
    const formdata = new FormData();
    for (const [key, value] of Object.entries(user)) {
      formdata.append(key, value);
    }
    let fieldArr=[]

    
    for (let i = 0; i < formFields.length; i++) {
      const name1 = formFields[i].fieldname
      const value = formFields[i].fieldvalue
      fieldArr.push({
        [name1]: value,
  
      });
      // formdata.append(name1, value);
      console.log(formFields[i].fieldname, formFields[i].fieldvalue)

    }

      
      console.log(fieldArr)
    formdata.append('fields', JSON.stringify(fieldArr));

    formdata.append('outdoor', JSON.stringify(outdoor));
    formdata.append('interior', JSON.stringify(interior));
    formdata.append('otherfeather', JSON.stringify(otherfeather));
    formdata.append('utilities', JSON.stringify(utilities));
    // for( let i=0; i<Image.length; i++){
    //   formdata.append(`propertyImg[${i}]`,Image[i])
    // }
    formdata.append('propertyImg', Image);
    formdata.append('propertyVideo', video);
    formdata.append('propertypdf', pdf);
    formdata.append('ClientId', ClientId);
    formdata.append('CompanyId', companyId);

  const  res=await apiformdata(formdata)
    .then((res)=>{
      console.log(res,"res")
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigate('/userdash')
      }, 3000);
    })
    .catch((err)=>{
      console.log(err,"eerr")
    })
    // alert("Form Submitted");
  }
  return (
    <div className='app-one'>

{modalVisible && ( 
         <Modal
         title="Form Successfully Submitted"
         visible={modalVisible}
         footer={null}
         closable={false}
       >
         <p>Your form has been successfully Submitted.</p>
       </Modal>
      )}
      <section>
        <div className='register'>
          <div className='col-1'>
            <h2>Register Your Property</h2>
            <span>Register and enjoy the service</span>

            <form id='form' className='flex flex-col'>

              <h4>Location & Purpose</h4>
              <hr className="border"></hr>
              <div>
                <label>Select Property Type</label>
                <input type='radio' id='house' name='property_type' value='House' onChange={getvalue} style={{ margin: "5px" }} />
                <label htmlFor='House'>House</label>
                <input type='radio' id='flat' name='property_type' value='Flat' onChange={getvalue} style={{ margin: "5px" }} />
                <label htmlFor='Flat'>Flat</label> <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>

              <input type='text' placeholder='City' name='city' onChange={getvalue} />
              <input type='text' placeholder='Location' name='location' onChange={getvalue} />

              <h4>Price & Area</h4><span style={{ color: "red", fontSize: "20px" }}>*</span>
              <hr className="border"></hr>


              <input type='number' placeholder='Area Size' name='area' onChange={getvalue} />
              <input type='number' placeholder='Price From' name='priceFrom' onChange={getvalue} />
              <input type='number' placeholder='Price To' name='priceTo' onChange={getvalue} />

              <div>
                <label>Installment Available</label>
                <input type='radio' id='yes' name='installment' value='Yes' onChange={getvalue} style={{ margin: "5px" }} />
                <label htmlFor='Yes'>Yes</label>
                <input type='radio' id='no' name='installment' value='No' onChange={getvalue} style={{ margin: "5px" }} />
                <label htmlFor='No'>No</label>
              </div>

              <div>
                <label>Ready For Possession</label>
                <input type='radio' id='yes' name='possession' value='Yes' onChange={getvalue} style={{ margin: "5px" }} />
                <label htmlFor='Yes'>Yes</label>
                <input type='radio' id='no' name='possession' value='No' onChange={getvalue} style={{ margin: "5px" }} />
                <label htmlFor='No'>No</label>
              </div>

              <h4>Features & Amenities</h4>
              <hr className="border"></hr>

              <input type='number' placeholder='Bedrooms' name='bedrooms' onChange={getvalue} />
              <input type='number' placeholder='Bathrooms' name='bathrooms' onChange={getvalue} />
              <input type='number' placeholder='Kitchen' name='kitchens' onChange={getvalue} />

              {/* ######################################################################################## */}

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
                  />
                  <label htmlFor="interiorDetails1" style={{ marginRight: "25px" }}> Equipped Kitchen</label>

                  <input
                    type="checkbox"
                    id="interiorDetails2"
                    name="gym"
                    value="Gym"
                    style={{ marginRight: "10px" }}
                    onChange={handleInteriorchange} />
                  <label htmlFor="interiorDetails2" style={{ marginRight: "25px" }}> Gym</label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="interiorDetails3"
                    name="laundry"
                    value="Laundry"
                    style={{ marginRight: "10px" }}
                    onChange={handleInteriorchange} />
                  <label htmlFor="interiorDetails3" style={{ marginRight: "25px" }}> Laundry</label>

                  <input
                    type="checkbox"
                    id="interiorDetails4"
                    name="mediaRoom"
                    value="Media Room"
                    style={{ marginRight: "10px" }}
                    onChange={handleInteriorchange} />
                  <label htmlFor="interiorDetails4" style={{ marginRight: "25px" }}> Media Room</label>
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
                    onChange={handleCheckboxChangeOutdoor} />
                  <label htmlFor="outdoorDetails1" style={{ marginRight: "25px" }}> Backyard</label>

                  <input
                    type="checkbox"
                    id="outdoorDetails2"
                    name="basketballCourt"
                    value="Basketball court"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor} />
                  <label htmlFor="outdoorDetails2" style={{ marginRight: "25px" }}> Basketball Court</label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="outdoorDetails3"
                    name="frontYard"
                    value="Front yard"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor} />
                  <label htmlFor="outdoorDetails3" style={{ marginRight: "25px" }}> Front yard</label>

                  <input
                    type="checkbox"
                    id="outdoorDetails4"
                    name="garageAttached"
                    value="Garage Attached"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor} />
                  <label htmlFor="outdoorDetails4" style={{ marginRight: "25px" }}> Garage Attached</label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="outdoorDetails5"
                    name="hotBath"
                    value="Hot Bath"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor} />
                  <label htmlFor="outdoorDetails5" style={{ marginRight: "25px" }}> Hot Bath</label>

                  <input
                    type="checkbox"
                    id="outdoorDetails6"
                    name="pool"
                    value="Pool"
                    style={{ marginRight: "10px" }}
                    onChange={handleCheckboxChangeOutdoor} />
                  <label htmlFor="outdoorDetails6" style={{ marginRight: "25px" }}> Pool</label>
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
                  />
                  <label htmlFor="feature1" style={{ marginRight: "25px" }}> Chair Accessible</label>

                  <input
                    type="checkbox"
                    id="feature2"
                    name="elevator"
                    value="Elevator"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange} />
                  <label htmlFor="feature2" style={{ marginRight: "25px" }}> Elevator</label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="feature3"
                    name="fireplace"
                    value="Fireplace"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange} />
                  <label htmlFor="feature3" style={{ marginRight: "25px" }}> Fireplace</label>

                  <input
                    type="checkbox"
                    id="feature4"
                    name="smokeDetectors"
                    value="Smoke Detectors"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange} />
                  <label htmlFor="feature4" style={{ marginRight: "25px" }}> Smoke Detectors</label>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="checkbox"
                    id="feature5"
                    name="washerAndDryer"
                    value="Washer and dryer"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange} />
                  <label htmlFor="feature5" style={{ marginRight: "25px" }}> Washer and dryer</label>

                  <input
                    type="checkbox"
                    id="feature6"
                    name="wifi"
                    value="WiFi"
                    style={{ marginRight: "10px" }}
                    onChange={handleotherfeatherchange} />
                  <label htmlFor="feature6" style={{ marginRight: "25px" }}> WiFi</label>
                </div>
              </div>

              {/* ######################################################################################## */}

              <h4>Ad Information</h4>
              <hr className="border"></hr>

              <input type='text' placeholder='Title' name='title' onChange={getvalue} />

              <div>
                <label htmlFor="description">Description</label>

                <textarea id="description" name="description" rows="4" cols="50" onChange={getvalue}>

                </textarea>
              </div>

              <h4>Property Images & Videos</h4>
              <hr className="border"></hr>

              <label htmlFor="propertyImg">Property Image</label>
              <input type='file' placeholder='Property Image' name='propertyImg' onChange={getimage} />
              {/* {
                Array.from(Image).map(item=>{
                  return(
                    <span>
                      <img
                        style={{padding:"10px"}}
                        width={150}
                        height={100}
                        src={item?URL.createObjectURL(item):null}
                      />
                    </span>
                  )
                })

              } */}

              <label htmlFor="propertyVideo">Property Video</label>
              <input type='file' placeholder='Property Video' name='propertyVideo' accept="video/*" onChange={getvideo} />

              <label htmlFor="propertyVideo">Property PDF</label>
              <input type='file' placeholder='Property PDF' name='propertypdf' accept="application/pdf" onChange={getpdf} />

              <h4>Contact Information</h4>
              <hr className="border"></hr>

              <input type='email' placeholder='Email' name='email' onChange={getvalue} />
              <input type='tel' placeholder='Mobile' name='mobile' onChange={getvalue} />
              <input type='tel' placeholder='Landline' name='Landline' onChange={getvalue} />

              {/* ########################################################################### */}
              {formFields.map((form, index) => {
                return (
                  <div key={index}>
                    <input
                      className='dynamic-input'
                      name='fieldname'
                      placeholder='Field Name'
                      onChange={event => handleFormChange(event, index)}
                    />
                    <input
                      className='dynamic-input'
                      name='fieldvalue'
                      placeholder='Value'
                      onChange={event => handleFormChange(event, index)}
                    />
                    <button type='button' className='btn-remove' onClick={() => removeFields(index)}>Remove</button>
                  </div>
                )
              })}

              <button type='button' className='btn' onClick={addFields}>Add More Fields</button>
              {/* ########################################################################### */}


              <button className='btn' onClick={submitform}>Register</button>
            </form>
          </div>
          <div className='col-2'></div>
        </div>
      </section>
    </div>

  )
}