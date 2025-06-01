
import React, { useState, useEffect } from "react";
import image1 from "../../imgs/1.gif";
import image2 from "../../imgs/2.png";
import image3 from "../../imgs/3.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../utils/firebase";

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
  const [role, setRole] = useState("Student");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const GoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userDetails = {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role: "Student", // Default role for social login
      };
      localStorage.setItem("user", JSON.stringify(userDetails));
      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const GitHubProvider = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const photoUrl = result.user.photoURL + "?height=500&access_token=" + token;
      await updateProfile(auth.currentUser, { photoURL: photoUrl });

      const userDetails = {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: photoUrl,
        role: "Student", // Default role for social login
      };
      localStorage.setItem("user", JSON.stringify(userDetails));
      navigate("/home");
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  const handleSignUp = () => {
    const userDetails = {
      firstName,
      lastName,
      email,
      password,
      role,
    };
    localStorage.setItem("user", JSON.stringify(userDetails));
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4">
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#2d2638] p-6 md:h-[610px] w-full max-w-[930px] rounded-lg relative">

        {/* Left Image Section */}
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
                  index === currentIndex
                    ? "bg-white bg-opacity-60 w-4"
                    : "bg-gray-300 bg-opacity-40"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Right Form Section */}
        <div className="bg-transparent p-6 text-white rounded-sm w-full md:w-[50%] h-full flex flex-col justify-center">
          <div className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-yellow-300">C</span>reate an account
          </div>
          <p className="text-sm mb-6">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-400">Log In</a>
          </p>

          {/* Form Inputs */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="p-2 md:p-3 rounded-sm outline-none text-black w-full"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 md:p-3 rounded-sm outline-none text-black w-full"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <input
            type="email"
            placeholder="your@gmail.com"
            className="p-2 md:p-3 rounded-sm outline-none text-black mt-4 md:mt-5 w-full"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative mt-4 md:mt-5 w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="p-2 md:p-3 rounded-sm outline-none text-black w-full"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Role Selection */}
          <select
            className="p-2 md:p-3 rounded-sm outline-none text-black mt-4 md:mt-5 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Sign Up Button */}
          <button
            className="bg-blue-600 text-white p-2 md:p-3 rounded-sm w-full mt-5"
            onClick={handleSignUp}
          >
            Create your Account
          </button>

          {/* Divider */}
          <div className="flex items-center w-full justify-center mt-5 ">
            <div className="border border-gray-500 w-20 h-[1px]"></div>
            <div className="mx-2 text-gray-500 ">or register with</div>
            <div className="border border-gray-500 w-20 h-[1px]"></div>
          </div>

          {/* Social Buttons */}
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
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
