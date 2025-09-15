import React, { useContext, useState,useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const{backendUrl,token,setToken, loadUserProfileData} = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState("Sign Up");

  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");


  // let onSubmitHandler = async(event) => {
  //   event.preventDefault();
  //   try {
  //     if (state === 'Sign Up') {
  //       const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
  //       if (data.success) {
  //         localStorage.setItem('token',data.token)
  //         setToken(data.token)
  //       }else{
  //         toast.error(data.message)
  //       }
  //     }else{
  //      const {data} = await axios.post(backendUrl + '/api/user/login',{password,email})
  //       if (data.success) {
  //         localStorage.setItem('token',data.token)
  //         setToken(data.token)
  //       }else{
  //         toast.error(data.message)
  //       } 
  //     }
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // };

   let onSubmitHandler = async(event) => {
  event.preventDefault();
  try {
    if (state === 'Sign Up') {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, password, email });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);

        // ✅ load user profile immediately
        await loadUserProfileData();
        navigate('/'); // redirect after successful sign-up
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, { password, email });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);

        await loadUserProfileData();
        navigate('/'); // redirect after login
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  
 useEffect(() => {
  setToken("");
  localStorage.removeItem("token");
}, []);


  return (
    <div className=" items-center flex flex-col  mt-20">
      <form  className="shadow-xl  flex flex-col justify-center items-center" onSubmit={onSubmitHandler}>
        <div className="flex flex-col items-start ml-0 sm:ml-8 gap-3 m-auto  p-4 min-w-[340px] sm:min-w-96  text-sm  font-semibold">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"} 
          </p>
          <p>
            Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment
          </p>
          {
            state === 'Sign Up' && <div className="text-start my-3 ">
          <label className="font-medium " >UserName</label> 
          <div className="left-0"><input
            type="text"
            onChange={(event) => setName(event.target.value)}
            className="form-control border border-black rounded w-80 p-1 "
            value={name}
          /></div>
        </div>
          } 
        </div>

        
        <div className="text-start my-3">
          <label className="font-medium " >email</label>
          <div><input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            className="form-control border border-black rounded w-80  p-1"
            value={email}
          /></div>
        </div>
         <div className="text-start my-3">
          <label className="font-medium " >Password</label>
          <div><input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="form-control border border-black rounded w-80  p-1"
            value={password}
          /></div>
        </div>
        <div className="">
          <button type="submit" className="bg-black text-white w-full py-2 rounded-md text-base mt-5">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?
              <span
                onClick={() => setState("Sign Up")}
                className="underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;





