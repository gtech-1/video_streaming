import React, { useState } from "react";
import image1 from "../../imgs/4.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"; 
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../../../utils/firebase";
import {
  getAuth,
  GoogleAuthProvider, 
} from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();

  const [existingEmail, setExistingEmail] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found! Please sign up first.");
      return;
    }

    if (storedUser.email === existingEmail && storedUser.password === existingPassword) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      navigate("/home");
    } else {
      alert("Invalid email or password.");
    }
  };

  const googleProvider = new GoogleAuthProvider();
  
    const GoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result.user);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    };
  
    const GitHubProvider = async () => {
      try {
        const provider = new GithubAuthProvider(); 
        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        let photoUrl = result.user.photoURL + "?height=500&access_token=" + token;
        await updateProfile(auth.currentUser, { photoURL: photoUrl });
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    };
  


  return (
    <div className="flex items-center justify-center h-screen w-screen p-4">
      <div className="flex flex-col md:flex-row items-center justify-center bg-[#2d2638] p-6 h-auto md:h-[630px] w-full max-w-[950px] rounded-lg relative">
        
        <div className="bg-transparent p-6 text-white rounded-lg w-full max-w-[400px] h-full flex flex-col items-center justify-center">
          <div className="w-full mb-3">
            <p className="text-3xl text-center mb-10 font-bold">Login</p>
            <p className="text-lg mt-2 text-center md:text-left">Welcome back,</p>
          </div>

          <div className="flex flex-col w-full items-center">
            <input
              type="email"
              placeholder="your@gmail.com"
              className="p-2 rounded-md outline-none text-black mt-3 w-full"
              onChange={(e) => setExistingEmail(e.target.value)}
            />
            <div className="relative mt-4 w-full">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="********"
                className="p-2 rounded-md outline-none text-black w-full"
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
              className="bg-blue-600 text-white p-2 rounded-md w-full mt-5"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="flex items-center w-full mt-5 justify-center">
              <div className="border border-gray-500 w-20 h-[1px]"></div>
              <div className="mx-2 text-gray-500">or</div>
              <div className="border border-gray-500 w-20 h-[1px]"></div>
            </div>

            <button
              onClick={GoogleLogin}
              className="flex items-center justify-center border border-gray-500 rounded-md bg-transparent text-gray-300 p-3 hover:bg-gray-800 transition mt-5 w-full"
            >
              <FcGoogle className="text-xl mr-2" />
              Login with Google
            </button>

            <button
              onClick={GitHubProvider}
              className="flex items-center justify-center border border-gray-500 rounded-md bg-transparent text-gray-300 p-3 hover:bg-gray-800 transition mt-5 w-full"
            >
              <FaGithub className="text-xl mr-2" />
              Login with Github
            </button>
          </div>
        </div>


        <div className="hidden md:flex rounded-lg w-[500px] h-[610px] -mr-8 items-center justify-center">
          <img
            src={image1}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
