import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { Menu, X } from "lucide-react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Replace with your chosen free background video URL from Coverr or Pexels
const bgVideoUrl = "https://coverr.co/s3/mp4/whiteboard-educator.mp4";

// Sample images for the carousel (replace with your preferred images)
const carouselImages = [
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
];

const Landing = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Section refs for smooth scrolling
  const heroRef = useRef(null);
  const dashboardRef = useRef(null);
  const coursesRef = useRef(null);
  const interactiveRef = useRef(null);
  const communityRef = useRef(null);
  const testimonialsRef = useRef(null);
  const carouselRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Modified scrollToSection function to handle desktop and mobile differently
  const scrollToSection = (ref, isDesktop = false) => {
    if (isDesktop) {
      if (ref.current) {
        const yOffset = -60; // Offset for fixed header
        const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      setIsMenuOpen(false);
      setTimeout(() => {
        if (ref.current) {
          const yOffset = -60;
          const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  };

  // Animation variants for dropdown menu
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  // Carousel settings using react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        className="sticky top-0 z-50 bg-gray-900 shadow-lg px-4 sm:px-6 md:px-8 lg:px-16 py-3 sm:py-4 flex justify-between items-center text-white"
      >
        <div className="text-xl sm:text-2xl font-bold">YourLMS</div>
        
        {/* Desktop Menu */}
        <div className="hidden xl:flex space-x-6 items-center">
          <button onClick={() => scrollToSection(heroRef, true)} className="hover:text-blue-400 transition">
            Home
          </button>
          <button onClick={() => scrollToSection(dashboardRef, true)} className="hover:text-blue-400 transition">
            Dashboard
          </button>
          <button onClick={() => scrollToSection(coursesRef, true)} className="hover:text-blue-400 transition">
            Courses
          </button>
          <button onClick={() => scrollToSection(interactiveRef, true)} className="hover:text-blue-400 transition">
            Interactive
          </button>
          <button onClick={() => scrollToSection(communityRef, true)} className="hover:text-blue-400 transition">
            Community
          </button>
          <button onClick={() => scrollToSection(testimonialsRef, true)} className="hover:text-blue-400 transition">
            Testimonials
          </button>
          <button onClick={() => scrollToSection(carouselRef, true)} className="hover:text-blue-400 transition">
            Carousel
          </button>
          <button onClick={() => scrollToSection(ctaRef, true)} className="hover:text-blue-400 transition">
            Connect
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="border border-white text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </div>
        
        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="xl:hidden text-white flex items-center"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <motion.div 
        className="xl:hidden overflow-hidden absolute z-40 w-full bg-gray-900 shadow text-white"
        initial="hidden"
        animate={isMenuOpen ? "visible" : "hidden"}
        variants={dropdownVariants}
      >
        <div className="px-4 pb-4 space-y-2">
          <button onClick={() => scrollToSection(heroRef)} className="block w-full py-2 text-left hover:text-blue-400 transition">Home</button>
          <button onClick={() => scrollToSection(dashboardRef)} className="block w-full py-2 text-left hover:text-blue-400 transition">Dashboard</button>
          <button onClick={() => scrollToSection(coursesRef)} className="block w-full py-2 text-left hover:text-blue-400 transition">Courses</button>
          <button onClick={() => scrollToSection(interactiveRef)} className="block w-full py-2 text-left hover:text-blue-400 transition">Interactive</button>
          <button onClick={() => scrollToSection(communityRef)} className="block w-full py-2 text-left hover:text-blue-400 transition">Community</button>
          <button onClick={() => scrollToSection(testimonialsRef)} className="block w-full py-2 text-left hover:text-blue-400 transition">Testimonials</button>
          <button onClick={() => scrollToSection(carouselRef)} className="block w-full py-2 text-left hover:text-blue-400 transition">Carousel</button>
          <button onClick={() => scrollToSection(ctaRef)} className="block w-full py-2 text-left hover:text-blue-400 transition">Connect</button>
          <button onClick={() => navigate("/signin")} className="block w-full py-2 text-left border-t border-gray-700 pt-2 mt-2 hover:text-blue-400">Sign Up</button>
        </div>
      </motion.div>

      {/* Hero Section with Background Video */}
      <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        >
          <source src={bgVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Animated Decorative Elements */}
        <motion.div
          className="absolute -top-16 -left-16 w-32 sm:w-40 h-32 sm:h-40 bg-blue-400 rounded-full filter blur-3xl opacity-50"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-32 sm:w-40 h-32 sm:h-40 bg-blue-400 rounded-full filter blur-3xl opacity-50"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold drop-shadow-lg text-white">
            Ignite Your Learning Journey
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl max-w-3xl text-white">
            Empower yourself with interactive courses, real-time academic tracking, and a global community.
          </p>
          <div className="mt-6 sm:mt-8">
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </section>

      {/* Carousel Section (Inspired by Coursera) */}
      <section ref={carouselRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Featured Courses
            </h2>
            <Slider {...sliderSettings}>
              {carouselImages.map((img, index) => (
                <div key={index}>
                  <img 
                    src={img} 
                    alt={`Featured course ${index + 1}`} 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Features Section */}
      <section ref={dashboardRef} className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Your Personalized Dashboard
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto mb-6 text-gray-700">
              Monitor your grades, assignments, and progress—all in one intuitive interface.
            </p>
            <motion.img
              src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Dashboard Preview"
              className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Courses Offered Section */}
      <section ref={coursesRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Explore Our Courses
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto mb-6 text-gray-700">
              Discover a wide range of courses designed to enhance your skills and knowledge in various tech domains.
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Web Development",
                "Java Programming",
                "C++ & Beyond",
                "Data Structures",
                "Networking",
                "Cyber Security",
                "Operating Systems",
                "Cloud Computing",
                "Machine Learning",
                "Database Management",
                "Mobile App Development",
                "DevOps & CI/CD"
              ].map((course) => (
                <motion.div
                  key={course}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                >
                  <h3 className="text-lg font-bold text-white">{course}</h3>
                  <div className="w-16 h-1 bg-blue-500 my-2 mx-auto"></div>
                  <p className="text-gray-300 text-sm">Advanced curriculum</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Learning Section */}
      <section ref={interactiveRef} className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Interactive Learning
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto mb-6 text-gray-700">
              Engage in live workshops, group projects, and real-time Q&amp;A sessions that make learning dynamic.
            </p>
            <motion.img
              src="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Interactive Workshop"
              className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Global Community Section */}
      <section ref={communityRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Join a Global Community
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto mb-6 text-gray-700">
              Connect with peers, mentors, and experts from around the world. Share insights, collaborate on projects, and grow together.
            </p>
            <motion.img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Global Community"
              className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Student Success Stories
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              <blockquote className="text-base sm:text-lg italic text-gray-700">
                "YourLMS transformed my academic journey. The dashboard kept me on track, and the courses opened new career doors."
              </blockquote>
              <blockquote className="text-base sm:text-lg italic text-gray-700">
                "I love the interactive approach—learning is engaging and the community support is outstanding."
              </blockquote>
              <blockquote className="text-base sm:text-lg italic text-gray-700">
                "From web dev to networking and cyber security, the variety of courses and real-time tracking helped me excel academically."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section ref={ctaRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Ready to Transform Your Future?
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto mb-6 text-gray-700">
              Join thousands of learners in an LMS designed to empower, engage, and elevate your academic and professional journey.
            </p>
            <button
              onClick={() => navigate("/signin")}
              className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition text-sm sm:text-base"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      <footer className="py-4 sm:py-6 bg-gray-900 text-white text-center text-sm">
        <p>&copy; {new Date().getFullYear()} YourLMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
