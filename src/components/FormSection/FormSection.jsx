import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormSection.css";

const FormSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    location: "",
  });
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);

  const degrees = ["Masters", "Bachelors"];
  const courses = {
    Bachelors: ["SAT", "ACT", "TOLC", "IELTS", "PTE", "TOEFL"],
    Masters: ["GRE", "GMAT", "IELTS", "PTE", "TOEFL"],
    Default: ["IELTS", "TOEFL", "PTE", "GRE", "GMAT", "SAT"],
  };
  const countries = [
    "US", "UK", "CANADA", "NEW ZEALAND", "AUSTRALIA", "GERMANY", "ITALY",
    "FRANCE", "Dubai", "SINGAPORE", "IRELAND",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountrySelect = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  const handleDegreeSelect = (degree) => {
    setSelectedDegree(degree);
    setSelectedCourse("");
  };

  const submitToGoogleSheets = (data) => {
    return new Promise((resolve) => {
     // const scriptUrl = 'https://script.google.com/macros/s/AKfycbyU2jUrzujnrU53kJC5l3BQXnu2QplQS_csTnjoylY44v3cklOagDzyjXSGv-wrxPAb-A/exec';
      const scriptUrl =  'https://script.google.com/macros/s/AKfycbxaEF8X9Rm4jIjLsSh6ay4zEalLA54M690-6D__PqckFMVQlzzIDnJ79WfUm7ZrkBnaxg/exec';
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || 'direct';
      const utmMedium = urlParams.get('utm_medium') || 'none';
      const utmCampaign = urlParams.get('utm_campaign') || 'organic';
      const trackingUrl = `https://skylinescholar.com/?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}&utm_id=${Date.now()}`;
      const callback = `callback_${Date.now()}`;

      const script = document.createElement('script');
      script.src = `${scriptUrl}?callback=${callback}&` +
        `name=${encodeURIComponent(data.name)}&` +
        `email=${encodeURIComponent(data.email)}&` +
        `mobile=${encodeURIComponent(data.mobile)}&` +
        `location=${encodeURIComponent(data.location)}&` +
        `degree=${encodeURIComponent(data.degree)}&` +
        `course=${encodeURIComponent(data.course)}&` +
        `countries=${encodeURIComponent(data.countries)}&` +
        `trackingUrl=${encodeURIComponent(trackingUrl)}&` +
        `utm_source=${encodeURIComponent(utmSource)}&` +
        `utm_medium=${encodeURIComponent(utmMedium)}&` +
        `utm_campaign=${encodeURIComponent(utmCampaign)}`;

      window[callback] = (response) => {
        delete window[callback];
        document.body.removeChild(script);
        resolve(response);
      };

      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.email || !formData.location) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!selectedDegree || !selectedCourse || selectedCountries.length === 0) {
      alert("Please complete all required selections.");
      return;
    }

    const submissionData = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      location: formData.location,
      degree: selectedDegree,
      course: selectedCourse,
      countries: selectedCountries.join(", "),
    };

    try {
      await submitToGoogleSheets(submissionData);
      navigate("/thankyou");
    } catch (error) {
      console.error("Error:", error);
      navigate("/failed");
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile*"
          value={formData.mobile}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location*"
          value={formData.location}
          onChange={handleInputChange}
          required
        />

        <div className="selection-section">
          <label>Which Degree do you want to pursue?*</label>
          <div className="button-group">
            {degrees.map((degree) => (
              <button
                key={degree}
                type="button"
                className={selectedDegree === degree ? "selected" : ""}
                onClick={() => handleDegreeSelect(degree)}
              >
                {degree}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-section">
          <label>SELECT COURSE*</label>
          <div className="button-group">
            {(selectedDegree ? courses[selectedDegree] : courses.Default).map(
              (course) => (
                <button
                  key={course}
                  type="button"
                  className={selectedCourse === course ? "selected" : ""}
                  onClick={() => setSelectedCourse(course)}
                >
                  {course}
                </button>
              )
            )}
          </div>
        </div>

        <div className="selection-section">
          <label>CHOOSE STUDY DESTINATION(S)*</label>
          <div className="button-group">
            {countries.map((country) => (
              <button
                key={country}
                type="button"
                className={selectedCountries.includes(country) ? "selected" : ""}
                onClick={() => handleCountrySelect(country)}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        <p className="terms">
          By submitting this form, you agree to the
          <a href="#"> Terms of Use </a> and
          <a href="#"> Privacy Policy</a>.
        </p>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </section>
  );
};

export default FormSection;
