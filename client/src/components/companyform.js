
import React from 'react';
import { useState } from 'react';
import { apiformdata, companyformdata } from '../services/api';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function Companyformform() {
  
  const valueobject = {
    companyname: "",
    description: "",
  };
  const [modalVisible,setModalVisible]=useState(false)

  const navigate=useNavigate()
  const [user, setUser] = useState(valueobject);
  const [Image, setImage] = useState();
  const getimage = (e) => {
    setImage(e.target.files[0]);
    console.log(Image,"iamge")
  };

  const getvalue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitform = async (e) => {
    e.preventDefault();
  // console.log(clientId,'cleidnId')
    const formdata = new FormData();
    for (const [key, value] of Object.entries(user)) {
      formdata.append(key, value);
    }

   let userId= localStorage.getItem("userId")  

    // }
    formdata.append('propertyImg', Image);
    formdata.append('userId', userId);

  const  res=await companyformdata(formdata)
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
            <h2>Register Your Company</h2>

            <form id='form' className='flex flex-col'>

              <h4>Company Name & Description</h4>
              <hr className="border"></hr>
              <input type='text' placeholder='Company Name' name='companyname' onChange={getvalue} />
              <input type='text' placeholder='Description' name='description' onChange={getvalue} />

            
              <h4>Company Images </h4>
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

              

              <button className='btn' onClick={submitform}>Register</button>
            </form>
          </div>
          <div className='col-2'></div>
        </div>
      </section>
    </div>

  )
}