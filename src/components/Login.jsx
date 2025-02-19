import React, { useState, useEffect } from "react";
import image1 from "../imgs/2.png";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [existingEmail, setExistingEmail] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      if (credentialResponse.credential) {
        const decodedUser = jwtDecode(credentialResponse.credential);
        console.log(decodedUser);
        navigate("/dashboard");
      }
    },
    onError: () => console.log("Login failed"),
  });

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === existingEmail && storedUser.password === existingPassword) {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-row items-center justify-center bg-[#2d2638] p-6 h-[610px] w-[950px] rounded-lg relative">
        
        <div className="bg-transparent p-6 text-white rounded-sm absolute left-0 w-[350px] h-full flex flex-col items-center justify-center">
          <div className="absolute top-[10%] left-7 text-bold text-3xl">
            <p>Login</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              type="email"
              placeholder="your@gmail.com"
              className="p-2 rounded-sm outline-none text-black mt-5 w-[385px]"
              onChange={(e) => setExistingEmail(e.target.value)}
            />
            <div className="relative mt-5 w-[385px]">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="********"
                className="p-2 rounded-sm outline-none text-black w-full"
                onChange={(e) => setExistingPassword(e.target.value)} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-2 top-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} 
              </button>
            </div>
            <button
              className="bg-blue-600 text-white p-2 rounded-sm w-[385px] mt-5"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="flex items-center w-[350px] mt-5 justify-center">
              <div className="border border-gray-500 w-20 h-[1px] "></div>
              <div className="mx-2 text-gray-500">or register with</div>
              <div className="border border-gray-500 w-20 h-[1px] "></div>
            </div>
          </div>

          <button
            onClick={login}
            className="flex items-center w-[350px] justify-center border border-gray-500 rounded-full bg-transparent text-gray-300 p-3 hover:bg-gray-800 transition mt-5"
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </div>

        <div className="rounded-lg w-[500px] absolute right-[8px] bottom-[8px] top-[8px] flex items-center justify-center">
          <img
            src={image1}
            className="absolute right-[8px] inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
