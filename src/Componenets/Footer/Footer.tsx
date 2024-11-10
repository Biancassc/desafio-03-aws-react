import React from 'react';
import InstagramIcon from "../../Assets/Frame 124.svg";
import YouTubeIcon from "../../Assets/Social Icons.svg"
import FacebookIcon from "../../Assets/Social Icons (1).svg"
import TwitterIcon from "../../Assets/Frame 126.svg"
import BrazilIcon from "../../Assets/Vector (2).svg"
import "../../Componenets/Footer/Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <p className='happy-work'>Assim que possível, me envie um email para que possamos trabalhar felizes juntos!</p>
      <div className="social-icons">
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <img src={InstagramIcon} alt="Instagram" width="40" height="40" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={FacebookIcon} alt="Facebook" width="40" height="40" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={TwitterIcon} alt="Twitter" width="40" height="40" />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={YouTubeIcon} alt="YouTube" width="40" height="40" />
        </a>
      </div>
      <div className='Copy-location'>
      <div className="location">
      <img src={BrazilIcon} alt="Brasil" />
        <p>Brasil</p>
      </div>
      <div className="copyright">
        <p>&copy; 2024, All Rights Reserved by Compass UOL</p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;