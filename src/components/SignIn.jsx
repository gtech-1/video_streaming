import React, { useState, useEffect } from "react";
import image1 from "../imgs/1.gif";
import image2 from "../imgs/2.png";
import image3 from "../imgs/3.webp";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const images = [
  { id: 1, src: image1 },
  { id: 2, src: image2 },
  { id: 3, src: image3 },
];

const SignIn = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSignUp = () => {
    const userDetails = { email, password, firstName, lastName };
    localStorage.setItem("user", JSON.stringify(userDetails));
    alert("Account created successfully!");
    navigate("/login");
  };

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      if (credentialResponse.credential) {
        const decodedUser = jwtDecode(credentialResponse.credential);
        console.log(decodedUser); 
        navigate("/login"); 
      }
    },
    onError: () => console.log("Login failed"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-row items-center justify-center bg-[#2d2638] p-6 h-[610px] w-[950px] rounded-lg relative">
        <div className="bg-transparent p-6 text-white rounded-sm absolute left-0 w-[350px] h-full flex flex-col justify-center">
          <div className="absolute top-[10%] left-7 text-bold text-3xl">
            <p>
              <span className="text-yellow-300">C</span>reate an account
            </p>

            <p className="text-sm absolute mt-1">
              Already have an account?{" "}
              <a href="/login" className="decoration-solid text-yellow-400">
                LogIn
              </a>
            </p>
          </div>

          <div className="flex flex-row gap-6 w-full">
            <input
              type="text"
              placeholder="First Name"
              className="p-2 rounded-sm outline-none text-black w-[180px]"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 rounded-sm outline-none text-black w-[180px]"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full ">
            <input
              type="email"
              placeholder="your@gmail.com"
              className="p-2 rounded-sm outline-none text-black mt-5 w-[385px]"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative mt-5 w-[385px]">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="********"
                className="p-2 rounded-sm outline-none text-black w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-2 top-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} 
              </button>
            </div>
          </div>

          <button className="bg-blue-600 text-white p-2 rounded-sm w-[385px] mt-5" onClick={handleSignUp}>
            Create your Account
          </button>

          <div className="flex items-center w-[350px] mt-5 justify-center">
            <div className="border border-gray-500 w-20 h-[1px]"></div>
            <div className="mx-2 text-gray-500">or register with</div>
            <div className="border border-gray-500 w-20 h-[1px]"></div>
          </div>

          <button
            onClick={login}
            className="flex items-center justify-center w-[385px] border border-gray-500 rounded-md bg-transparent text-gray-300 p-2 hover:bg-gray-800 transition mt-5"
          >
            <FcGoogle className="text-xl mr-2" />
            Sign in with Google
          </button>
        </div>

        <div className="rounded-lg w-[500px]  absolute right-[8px] bottom-[8px] top-[8px] flex items-center justify-center ">
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.src}
              alt={`Slide ${image.id}`}
              className={`absolute right-[8px] inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute bottom-4 flex space-x-2">
            {images.map((image, index) => (
              <span
                key={image.id}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white bg-opacity-60  w-4"
                    : "bg-gray-300 bg-opacity-40"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
