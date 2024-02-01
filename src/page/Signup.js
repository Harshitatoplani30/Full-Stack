import React, { useState } from "react";
import loginsignupimage from "../Assests/signupgif.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Await, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { imageupload } from "../utility/imageupload";
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  });
  console.log(data);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowconfirmPassword = () => {
    setShowconfirmPassword((preve) => !preve);
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleuploadprofileimage = async (e) => {
    const data = await imageupload(e.target.files[0]);
    console.log(data)
    setData(
      (prev)=>{
        return{...prev,"image":data}
      }
    )
  };
console.log(process.env.REACT_APP_SERVER_DOMAIN)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password == confirmPassword) {
        
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
          method : "POST",
        headers :{
          "content-type" : "application/json"
        }
        ,body : JSON.stringify(data),
        })
        const dataRes = await fetchData.json()
        // window.location.reload();
        console.log(dataRes)
        
      // alert(dataRes.message)
      toast(dataRes.message)

      if (dataRes.alert) {
        navigate("/login");
      }
      
    }
    else{
        // alert("Passwords do not match");
        toast("Passwords do not match")
      }
    } 
    else {
      alert("Please Enter Require Fields");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className=" w-20 h-full overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <label htmlFor="profileimage">
            <img src={data.image? data.image: loginsignupimage} className="w-full h-full cursor-pointer" />
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-20 w-full text-center r">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileimage"
              name="profileimage"
              accept="image/"
              className="hidden"
              onChange={handleuploadprofileimage}
            ></input>
          </label>
        </div>

        <form className="w-full py-3 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstName"
            placeholder="John"
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded  outline focus-within:outline-blue"
            value={data.firstName}
            onChange={handleOnchange}
          ></input>

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastName"
            placeholder="Den"
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded outline focus-within:outline-blue"
            value={data.lastName}
            onChange={handleOnchange}
          ></input>

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email Address"
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded outline focus-within:outline-blue"
            value={data.email}
            onChange={handleOnchange}
          ></input>

          <label htmlFor="password">Password</label>
          <div className=" px-2 py-1 flex bg-slate-200 rounded mt-1 mb-2 outline ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Set New password"
              className=" w-full bg-slate-200 outline-none"
              value={data.password}
              onChange={handleOnchange}
            ></input>
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className=" px-2 py-1 flex bg-slate-200 rounded mt-1 mb-2 outline">
            <input
              type={showconfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              placeholder="Confirm password"
              className=" w-full bg-slate-200 outline-none "
              value={data.confirmPassword}
              onChange={handleOnchange}
            ></input>
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowconfirmPassword}
            >
              {showconfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="max-w-[150px] w-full m-auto bg-slate-300 hover:bg-blue-500 cursor-pointer p-1 text-xl font-medium rounded-full text-center mt-4 ">
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already Registered ?{" "}
          <Link to={"/login"} className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
