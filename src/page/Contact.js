// ContactUsPage.js

import React, { useState } from 'react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send the data to a backend server)
    console.log('Form submitted:', formData);
    // Clear the form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="contact-us-container bg-slate-300 my-10 max-w-90 m-3 shadow-md drop-shadow">
      
      <div className="contact-info">
        <h2 className='text-slate-500 font-semibold text-lg '>Contact Yummify</h2>
        <p>Address: Yummify Headquarters, Khandwa, India</p>
        <p>Phone: +91 123 456 7890</p>
      </div>

      <div className="me-20 pr-5">
        <h2 className='text-slate-500 font-semibold text-lg '>Timing</h2>
        <p>Opening Days:  Monday - Friday : 9 AM - 5 PM</p>
        <p>Closing Days: Saturday & Sunday : Closed</p>
      </div>

     
      <div className="contact-form">
        <h2 className='text-slate-500 font-semibold text-lg '>Send us a message</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />

          <button className='bg-slate-500' type="submit">Submit</button>
        </form>
      </div>

      {/* Add inline CSS */}
      <style>{`
        .contact-us-container {
          display: flex;
          justify-content: space-around;
          padding: 20px;
        }

        .contact-info,
        .contact-form {
          width: 45%;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 5px;
        }

        input,
        textarea {
          margin-bottom: 10px;
          padding: 8px;
        }

        button {
          background-color:;
          color: white;
          padding: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;
