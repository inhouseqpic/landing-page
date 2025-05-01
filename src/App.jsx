import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import FormSection from "./components/FormSection/FormSection";
import Footer from "./components/Footer/Footer";
import ThankYou from "./pages/ThankYou";
import Failed from "./pages/Failed";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FormSection />
              </>
            }
          />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/failed" element={<Failed />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
