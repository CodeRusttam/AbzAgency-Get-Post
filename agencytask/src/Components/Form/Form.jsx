import React, { useContext, useRef } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Success from "../../img/success-image.png";
import { UserListContext } from "../../App";
const NAME_REGEX = /^[A-z][A-z0-9-_]{2,60}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^[\+]{0,1}380([0-9]{9})$/;
function Form() {
  const url = "https://frontend-test-assignment-api.abz.agency/api/v1/users";
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);
  const ctx = useContext(UserListContext);
  const getToken = async () => {
    const { data } = await axios.get(
      "https://frontend-test-assignment-api.abz.agency/api/v1/token"
    );
    return data.token;
  };
  const getPositions = async () => {
    const { data } = await axios.get(
      "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
    );
    setPositions(data.positions);
  };
  const getUsers = async (e) => {
    const { data } = await axios.get(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users?&count=5"
    );
    setUsers(data.users);
  };
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getPositions();
  }, []);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: "",
  });
  const [userPhoto, setUserPhoto] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [validPhoto, setValidPhoto] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const errRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
    emailRef.current.focus();
    phoneRef.current.focus();
  }, []);
  useEffect(() => {
    setValidName(NAME_REGEX.test(formValue.name));
  }, [formValue.name]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formValue.email));
  }, [formValue.email]);
  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(formValue.phone));
  }, [formValue.phone]);
  useEffect(() => {
    setValidPhoto(userPhoto == "" ? false : true);
  }, [userPhoto]);
  console.log(validPhoto);
  useEffect(() => {
    setErrMsg("");
  }, [formValue.name, formValue.email, formValue.phone]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(formValue.name);
    const v2 = EMAIL_REGEX.test(formValue.email);
    const v3 = PHONE_REGEX.test(formValue.phone);
    if (!v1 || !v2 || !v3 || validPhoto === false) {
      alert('Please fill all inputs')
      setErrMsg("Invalid entry");
      return;
    }
    const token = await getToken();
    let formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("email", formValue.email);
    formData.append("phone", formValue.phone);
    formData.append("position_id", +formValue.position_id);
    formData.append("photo", userPhoto);
    await axios.post(url, formData, {
      headers: {
        Token: token,
      },
    });
    const arr = [...formData];
    const newuser = {
      name: arr[0][1],
      email: arr[1][1],
      phone: arr[2][1],
      position: positions.find((i) => (i.id = arr[3][1])).name,
      photo: URL.createObjectURL(arr[4][1]),
    };
    setSuccess(true);
    ctx.setUserList([{ ...newuser }, ...users]);
  };
  const handle = (e) => {
    let newdata = { ...formValue };
    newdata[e.target.id] = e.target.value;
    setFormValue(newdata);
    console.log(newdata);
  };
  const hadleImage = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      let image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        let height = this.height;
        let width = this.width;
        if (height > 70 || width > 70) {
          alert('Image size must not exceed 70px')
          return false;
        } else if(file.size > 5e+6){
          alert('File size must not exceed 5MB')
        }else {
          setUserPhoto(file);
        }
      };
    };
  };
  return (
    <>
      {success ? (
        <div ref={errRef} className="block pt-28 text-center">
          <h1 className="mb-10 headers-style">User successfully registered</h1>
          <img className="w-[30%] m-auto" src={Success} alt="" />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col">
            <h3 className="headers-style text-center mb-2">
              Working with POST request
            </h3>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                ref={nameRef}
                autoComplete="off"
                style={{ border: "1px solid #D0CFCF" }}
                className="input invalid: focus:true"
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                onChange={handle}
                value={formValue.name}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onBlur={() => setUserFocus(true)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && formValue.name && !validName
                    ? "error-text"
                    : "hidden"
                }
              >
                2 to 60 characters
              </p>
              <input
                ref={emailRef}
                autoComplete="off"
                style={{ border: "1px solid #D0CFCF" }}
                className="input"
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handle}
                aria-invalid={validEmail ? "false" : "true"}
                value={formValue.email}
                aria-describedby="uidnote"
                required
                onBlur={() => setEmailFocus(true)}
              />
              <p
                id="uidnote"
                className={
                  emailFocus && formValue.email && !validEmail
                    ? "error-text"
                    : "hidden"
                }
              >
                Invalid Email
              </p>
              <input
                ref={phoneRef}
                autoComplete="off"
                style={{ border: "1px solid #D0CFCF" }}
                className="input mb-0"
                type="string"
                name="phone"
                id="phone"
                placeholder="Phone"
                aria-describedby="uidnote"
                aria-invalid={validPhone ? "false" : "true"}
                onChange={handle}
                value={formValue.phone}
                required
                onBlur={() => setPhoneFocus(true)}
              />
              <p
                id="uidnote"
                className={
                  phoneFocus && formValue.phone && !validPhone
                    ? "error-text"
                    : "hidden"
                }
              >
                Number should start with +380
              </p>
              <div
                className="w-48 text-end font-normal text-xs mb-7"
                style={{ color: "#7E7E7E" }}
              >
                +38(XXX)XXX-XX-XX
              </div>
              <div className="w-80 m-auto">
                <h4 className="text-style mb-3">Select your position</h4>
                <div>
                  {positions.map((data, i) => {
                    return (
                      <label
                        key={i}
                        className="flex items-center text-style"
                        htmlFor="position_id"
                      >
                        <input
                          className="w-5 h-5 mr-3"
                          style={{ backgroundColor: "#00BDD3" }}
                          onChange={handle}
                          type="radio"
                          name="position_id"
                          id="position_id"
                          value={data.id}
                          required
                        />
                        {data.name}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="w-80 py-10 m-auto flex items-center">
                <label
                  className="w-20 pl-3 py-2 rounded-l"
                  htmlFor="photo"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.87)",
                  }}
                >
                  Upload
                </label>
                {userPhoto ? (
                  <label
                    className="pl-3 py-2 w-60 rounde-r"
                    style={{ border: "1px solid rgba(208, 207, 207, 1)" }}
                  >
                    {userPhoto.name}
                  </label>
                ) : (
                  <label
                    className="pl-3 py-2 w-60 rounde-r"
                    style={{ border: "1px solid rgba(208, 207, 207, 1)" }}
                  >
                    Upload your photo
                  </label>
                )}
              </div>
              <input
                className="hidden"
                type="file"
                id="photo"
                onChange={hadleImage}
                accept=".jpg, .jpeg"
                required
              />
              <div className="text-center">
                <button
                  className="btn"
                  style={{ backgroundColor: "#B4B4B4" }}
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
