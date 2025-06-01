import React, { useState, useEffect } from "react";
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
import { authAPI } from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.login(formData);
      
      if (response.status === 200) {
        // Store the JWT token and user data
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        alert("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
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

          {apiError && (
            <div className="bg-red-500 text-white p-3 rounded-md w-full mb-4">
              {apiError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col w-full items-center">
            <div className="w-full">
              <input
                type="email"
                name="email"
                placeholder="your@gmail.com"
                className={`p-2 rounded-md outline-none text-black mt-3 w-full ${
                  errors.email ? "border-2 border-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative mt-4 w-full">
              <input
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="********"
                className={`p-2 rounded-md outline-none text-black w-full ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-2 top-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} 
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 text-white p-2 rounded-md w-full mt-5 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm mt-4">
              Don't have an account?{" "}
              <a href="/signin" className="text-blue-400 hover:text-blue-300">
                Sign up
              </a>
            </p>

            <div className="flex items-center w-full mt-5 justify-center">
              <div className="border border-gray-500 w-20 h-[1px]"></div>
              <div className="mx-2 text-gray-500">or</div>
              <div className="border border-gray-500 w-20 h-[1px]"></div>
            </div>

            <button
              type="button"
              onClick={GoogleLogin}
              className="flex items-center justify-center border border-gray-500 rounded-md bg-transparent text-gray-300 p-3 hover:bg-gray-800 transition mt-5 w-full"
            >
              <FcGoogle className="text-xl mr-2" />
              Login with Google
            </button>

            <button
              type="button"
              onClick={GitHubProvider}
              className="flex items-center justify-center border border-gray-500 rounded-md bg-transparent text-gray-300 p-3 hover:bg-gray-800 transition mt-5 w-full"
            >
              <FaGithub className="text-xl mr-2" />
              Login with Github
            </button>
          </form>
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
