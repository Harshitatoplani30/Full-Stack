import React, { useState } from "react";
import loginsignupimage from "../Assests/signupgif.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {loginRedux} from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "", 
  });
  const navigate = useNavigate()

  

  const userData = useSelector(state => state)
  console.log(userData)

  const dispatch = useDispatch()






  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  
  const handleOnchange =(e) => {
    const {name,value} = e.target
    setData((preve)=>{
      return{
      ...preve,
      [name] : value
      }
    })
    
  }
  

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const {email,password,} =data
    if ( email && password  ) {
        // alert("successfull")

        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
          method : "POST",
        headers :{
          "content-type" : "application/json"
        }
        ,body : JSON.stringify(data),
        })
        const dataRes = await fetchData.json()
        console.log(dataRes)
        toast(dataRes.message)
        
        if (dataRes.alert) {
          dispatch(loginRedux(dataRes))
          navigate("/")
        }
        else{
          
        }
        console.log(userData)
    }
    else{
      // alert("Please Enter Require Fields")
      toast("Please Fill Required Fields")
    }
  }
  return (
     <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginsignupimage} className="w-full" />
        </div>
        
        <form className="w-full py-3 flex flex-col " onSubmit={handleSubmit}>
        

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Registered Email Address"
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
              placeholder="Password"
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

          
            

          <button 
          className="max-w-[150px] w-full m-auto bg-slate-300 hover:bg-blue-500 cursor-pointer p-1 text-xl font-medium rounded-full text-center mt-4 ">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ?{" "}
          <Link to={"/Signup"} className="text-blue-500 underline">
            Signup now!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;