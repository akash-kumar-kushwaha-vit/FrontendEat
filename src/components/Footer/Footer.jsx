import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

export default function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className="footer-containt">

        {/* Left Section */}
        <div className="footer-containt-left">
          <img src={assets.logo} alt="Company Logo" />
          <p>
            Bringing you fresh food and fast delivery. Our mission is to serve 
            quality meals that make your day better.
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-containt-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-containt-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 93260 00000</li>
            <li>support@foodapp.com</li>
          </ul>
        </div>

      </div>
      <hr />
      <p className="footer-copyright">
        © {new Date().getFullYear()} FoodApp. All rights reserved.
      </p>
    </div>
  )
}
