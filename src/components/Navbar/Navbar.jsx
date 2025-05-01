import React from "react";
import logo from "../../assets/images/logo.webp";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const phoneNumber = "8233332722"; // Without country code
  const formattedNumber = "82333 32722"; // Formatted for display
  const whatsappNumber = "918233332722"; // With country code, no +

  const handlePhoneClick = () => {
    window.location.href = `tel:+91${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    const message = "Hello Skyline Scholars, I'm interested in your study abroad programs.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img 
          src={logo} 
          alt="Skyline Scholars - Study Abroad Specialists" 
          className="logo-image" 
        />
      </div>
      
      <div className="contact-buttons">
        <div 
          className="contact-button whatsapp-button"
          onClick={handleWhatsAppClick}
          title="Message us on WhatsApp"
        >
          <FaWhatsapp className="whatsapp-icon" />
          <span>WhatsApp</span>
        </div>
        
        <div 
          className="contact-button phone-button"
          onClick={handlePhoneClick}
          title="Call us"
        >
          <FaPhone className="phone-icon" />
          <span>{formattedNumber}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;