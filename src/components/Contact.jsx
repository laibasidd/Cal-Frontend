// ContactForm.jsx

import React, { useState, useEffect } from "react";
import "./ContactForm.css"; // Import the CSS file

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null); // New state for error handling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);

    try {
      const response = await fetch("https://calculator-back-8ljb.vercel.app/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // Successful submission
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
        }, 7000);
      } else {
        // Error from the server
        setSubmissionError(result.error || "Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-title">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="contact-form-field">
          <label htmlFor="name" className="contact-form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="contact-form-input"
            placeholder="What's your name?"
            required
          />
        </div>

        <div className="contact-form-field">
          <label htmlFor="email" className="contact-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="contact-form-input"
            placeholder="What's your email?"
            required
          />
        </div>

        <div className="contact-form-field">
          <label htmlFor="message" className="contact-form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="contact-form-textarea"
            placeholder="What do you want to say?"
            rows="5"
            required
          />
        </div>

        <div className="contact-form-actions">
          <button type="submit" className="contact-form-button">
            Send
          </button>
        </div>

        {formSubmitted && (
          <p className="contact-form-success">Thank you for your message!</p>
        )}

        {submissionError && (
          <p className="contact-form-error">{submissionError}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;