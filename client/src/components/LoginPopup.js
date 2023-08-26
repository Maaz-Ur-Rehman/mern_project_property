import React, { useState } from "react";
import axios from "axios";
import "../css/Popup.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

function LoginPopup(probs) {
  const navigate=useNavigate()
  const [userIsRegistered, setUserState] = useState("true");
  const [showAlert, setShowAlert] = useState(false);
  function updateForm() {
    setUserState(!userIsRegistered);
  }

  const data = { email: "", password: "" };
  const additionalProperties = !userIsRegistered
    ? { confirmPassword: "", companyName: "" }
    : null;
  const allData = Object.assign({}, data, additionalProperties);

  var [inputData, updateData] = useState(allData);
  function changeHandler(event) {
    updateData({ ...inputData, [event.target.name]: event.target.value });
  }
  const [loginData, setData] = useState("");
  const [modalVisible, setModalVisible] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")
  async function loginClicked(event) {
    event.preventDefault();
    // console.log(inputData);
    // setData({ ...inputData });
    // console.log(inputData,"data")
    console.log(inputData.email, "email")
    // console.log(loginData)
    if (userIsRegistered) {
      if (inputData.email === "") {
        setPopupMessage("Please enter your email");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);

      }
      else if (!inputData.email.includes('@')) {
        setPopupMessage("enter valid email");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      }
      else if (inputData.password === "") {
        setPopupMessage("please enter your password");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000)
      }
      else {
        try {

          const res = await axios
            .post(
              "http://localhost:7000/login",
              {
                email: inputData.email,
                password: inputData.password,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log(res,"status")
              if (res.data.status === 201) {

                const user = res.data.result.user.user
                console.log(user,"user")
                if (user === "user") {
                  if (res.data.result.user.status === "pending"){
                    setPopupMessage("you are on pending plz wait");
                    setModalVisible(true);
                    setTimeout(() => {
                      setModalVisible(false);
                    }, 3000)
                  }
                  else if (res.data.result.user.status === "Rejected") {
                    setPopupMessage("you are rejected");
                    setModalVisible(true);
                    setTimeout(() => {
                      setModalVisible(false);
                    }, 3000)
                  }
                  else {
                    const tokenGet = res.data.result.token;
                    localStorage.setItem("userDataToken", tokenGet);
                    setPopupMessage("Login Successfull");
                    setModalVisible(true);
                    setTimeout(() => {
                      setModalVisible(false);
                      navigate("/userdash")
                    }, 3000)

                  }
                }
                else {
                  setPopupMessage("Login Successfull");
                    setModalVisible(true);
                    setTimeout(() => {
                      setModalVisible(false);
                      navigate("/dash")
                    }, 3000)

                }

              } else {
                // setPopupMessage(`User Not Found Plz SignUp`);
                setPopupMessage(`incorrect credenteial`);

                setModalVisible(true);
                setTimeout(() => {
                  setModalVisible(false);
                }, 3000)
              }
            })
            .catch((err) => {
              setPopupMessage(`Login not Success , ${err},maaz`);
                    setModalVisible(true);
                    setTimeout(() => {
                      setModalVisible(false);
                    }, 3000)
            });
        } catch (err) {
          setPopupMessage(`incorect Credential , ${err},lkfsdjfklsdjfsk`);
                    setModalVisible(true);
                    setTimeout(() => {
                      setModalVisible(false);
                    }, 3000)
        }
      }


    }
    else {
      try {
        console.log(loginData);
        await axios
          .post("http://localhost:7000/signup", {
            companyName: inputData.companyName,
            email: inputData.email,
            password: inputData.password,
            confirmPassWord: inputData.confirmPassword,
          })
          .then((res) => {
            if (res.data.status === 201) {
              const tokenGet = res.data.result.token;
              // console.log(res)
              localStorage.setItem("userDataToken", tokenGet);
              navigate("/dash");
            }
            setPopupMessage("signup sucessfull");
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
            }, 3000)
            
          })
          .catch((err) => {

            setPopupMessage("user already exist");
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
            }, 3000)
          });
      } catch (err) {
        alert("credentail error");
      }
    }

    if (
      inputData.email !== "" ||
      inputData.password !== "" ||
      inputData.confirmPassword !== "" ||
      inputData.companyName !== ""
    ) {
      updateData({
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
      });
    }
  }

  return (
    <div> 
         {modalVisible && (
      <Modal
      title={popupMessage}
      visible={modalVisible}
      footer={null}
      closable={false}
      style={{top:"10px"}}
      >

      </Modal>
    )}

    <div className="popup-overlay">
      <div className="popup-content">
        <div className="head-container">
          <h2 className="heading2">
            {userIsRegistered ? "LOG-IN" : "SIGN-UP"}
          </h2>
          <span className="exit" onClick={probs.closePopup}>
            &times;
          </span>
        </div>

        <span className="line"></span>

        <form className="form" onSubmit={loginClicked}>
            {!userIsRegistered ? (
              <input
                type="text"
                placeholder="COMPANY NAME"
                name="companyName"
                value={inputData.companyName}
                onChange={changeHandler}
              />
            ) : null}
            <input
              type="email"
              placeholder="EMAIL"
              name="email"
              value={inputData.email}
              onChange={changeHandler}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              name="password"
              value={inputData.password}
              onChange={changeHandler}
            />
            {!userIsRegistered ? (
              <input
                type="password"
                placeholder="CONFIRM PASSWORD"
                name="confirmPassword"
                value={inputData.confirmPassword}
                onChange={changeHandler}
              />
            ) : null}

            <button type="submit">
              {userIsRegistered ? "LOG-IN" : "SIGN-UP"}
            </button>
          </form>
                  <h6 className="heading6" onClick={updateForm}>
          {userIsRegistered
            ? "DON'T HAVE AN ACCOUNT?"
            : "ALREADY HAVE AN ACCOUNT?"}
        </h6>
      </div>
    </div>
    </div>

  );
}

export default LoginPopup;
