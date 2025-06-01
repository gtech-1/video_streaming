import React, { useState, useEffect } from "react";
import image1 from "../../imgs/1.gif";
import image2 from "../../imgs/2.png";
import image3 from "../../imgs/3.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";  
import {
  getAuth,
  GoogleAuthProvider, 
} from "firebase/auth";
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../../../utils/firebase";
import { authAPI } from "../../services/api";

const images = [
  { id: 1, src: image1 },
  { id: 2, src: image2 },
  { id: 3, src: image3 },
];

const SignIn = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password strength validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setApiError("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.register(formData);

      if (response.status === 201) {
        // Store the JWT token and user data
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        alert("Account created successfully!");
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4">
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#2d2638] p-6 md:h-[610px] w-full max-w-[930px] rounded-lg relative">
        
        <div className="hidden md:flex rounded-lg w-[54%] h-[590px] relative left-[-10px] items-center justify-center">
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.src}
              alt={`Slide ${image.id}`}
              className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute bottom-4 flex space-x-2">
            {images.map((image, index) => (
              <span
                key={image.id}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white bg-opacity-60 w-4" : "bg-gray-300 bg-opacity-40"
                }`}
              ></span>
            ))}
          </div>
        </div>

        <div className="bg-transparent p-6 text-white rounded-sm w-full md:w-[50%] h-full flex flex-col justify-center">
          <div className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-yellow-300">C</span>reate an account
          </div>
          <p className="text-sm mb-6">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-400">Log In</a>
          </p>

          {apiError && (
            <div className="bg-red-500 text-white p-3 rounded-sm mb-4">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={`p-2 md:p-3 rounded-sm outline-none text-black w-full ${
                    errors.firstName ? "border-2 border-red-500" : ""
                  }`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={`p-2 md:p-3 rounded-sm outline-none text-black w-full ${
                    errors.lastName ? "border-2 border-red-500" : ""
                  }`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="your@gmail.com"
                className={`p-2 md:p-3 rounded-sm outline-none text-black w-full ${
                  errors.email ? "border-2 border-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                className={`p-2 md:p-3 rounded-sm outline-none text-black w-full ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
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
              className={`bg-blue-600 text-white p-2 md:p-3 rounded-sm w-full mt-5 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Creating Account..." : "Create your Account"}
            </button>
          </form>

          <div className="flex items-center w-full justify-center mt-5">
            <div className="border border-gray-500 w-20 h-[1px]"></div>
            <div className="mx-2 text-gray-500">or register with</div>
            <div className="border border-gray-500 w-20 h-[1px]"></div>
          </div>

          <button
            onClick={GoogleLogin}
            className="flex items-center justify-center w-full border border-gray-500 rounded-md bg-transparent text-gray-300 p-2 md:p-3 hover:bg-gray-800 transition mt-5"
          >
            <FcGoogle className="text-xl mr-2" />
            Sign in with Google
          </button>

          <button
            onClick={GitHubProvider}
            className="flex items-center justify-center w-full border border-gray-500 rounded-md bg-transparent text-gray-300 p-2 md:p-3 hover:bg-gray-800 transition mt-5"
          >
            <FaGithub className="text-xl mr-2" />
            Sign in with Github
          </button>
        </div>

      </div>
    </div>
  );
};

export default SignIn;

