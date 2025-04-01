import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/4812490.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const motiveRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // close mobile menu on selection
  };

  return (
    <div className="min-h-screen bg-white text-blue-900 font-medium scroll-smooth">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md px-4 sm:px-8 md:px-16 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-800">YourLMS</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm md:text-base items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600">Home</button>
          <button onClick={() => scrollToSection(aboutRef)} className="hover:text-blue-600">About</button>
          <button onClick={() => scrollToSection(servicesRef)} className="hover:text-blue-600">Services</button>
          <button onClick={() => scrollToSection(motiveRef)} className="hover:text-blue-600">Motive</button>
          <button onClick={() => scrollToSection(contactRef)} className="hover:text-blue-600">Contact</button>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow text-sm">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block w-full text-left hover:text-blue-600">Home</button>
          <button onClick={() => scrollToSection(aboutRef)} className="block w-full text-left hover:text-blue-600">About</button>
          <button onClick={() => scrollToSection(servicesRef)} className="block w-full text-left hover:text-blue-600">Services</button>
          <button onClick={() => scrollToSection(motiveRef)} className="block w-full text-left hover:text-blue-600">Motive</button>
          <button onClick={() => scrollToSection(contactRef)} className="block w-full text-left hover:text-blue-600">Contact</button>
          <button onClick={() => navigate("/login")} className="block w-full text-left text-blue-700">Log In</button>
          <button onClick={() => navigate("/signin")} className="block w-full text-left text-blue-700">Sign Up</button>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-blue-800">
            Learn anywhere, <br className="hidden sm:block" /> grow everywhere.
          </h1>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Unlock your future with flexible, real-world learning experiences built for modern minds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate("/login")}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Join for Free
            </button>
          </div>
        </div>

        <div className="md:w-1/2">
          <img
            src={banner}
            alt="Hero student illustration"
            className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-sm"
          />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">About Us</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          We’re building the next generation learning platform — empowering students to learn at their pace and on their terms.
        </p>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 px-4 sm:px-6 bg-blue-50 max-w-5xl mx-auto rounded text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Services</h2>
        <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg space-y-2">
          <li>Curated interactive courses by top mentors</li>
          <li>Real-world projects and hands-on labs</li>
          <li>Progress tracking and certification</li>
        </ul>
      </section>

      {/* Motive Section */}
      <section ref={motiveRef} className="py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Motive</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          To democratize access to high-quality learning and ensure no one is left behind in the digital education age.
        </p>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 px-4 sm:px-6 bg-blue-50 max-w-5xl mx-auto rounded text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Contact Us</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          For any queries or support, reach us at:{" "}
          <span className="underline">gurupattar17@gmail.com</span>
        </p>
      </section>
    </div>
  );
};

export default Landing;
