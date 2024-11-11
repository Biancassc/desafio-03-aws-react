import React, { useState } from 'react'
import InstagramIcon from "../../Assets/Frame 124.svg";
import YouTubeIcon from "../../Assets/Social Icons.svg";
import FacebookIcon from "../../Assets/Social Icons (1).svg";
import TwitterIcon from "../../Assets/Frame 126.svg";
import BrazilIcon from "../../Assets/Vector (2).svg"; 
import PencilIcon from "../../Assets/Group 13.svg";
import "./Footer.css";

const Footer = ({ socialLinks, isEditing, onSocialLinkEdit }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSocial, setCurrentSocial] = useState('');
  const [newLink, setNewLink] = useState('');

  const handleSocialEditClick = (social: string) => {
    setCurrentSocial(social);
    setNewLink(socialLinks[social] || ''); 
    setIsModalOpen(true);
  };

  const handleModalSave = () => {
    onSocialLinkEdit(currentSocial, newLink); 
    setIsModalOpen(false); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentSocial('');
    setNewLink('');
  };

  return (
    <footer className="footer">
      <p className='happy-work'>Assim que possível, me envie um email para que possamos trabalhar felizes juntos!</p>
      <div className="social-icons">
        <div className="social-icon-container">
        <a href={socialLinks?.instagram || '#'} target="_blank" rel="noopener noreferrer">
  <img src={InstagramIcon} alt="Instagram" width="40" height="40" />
</a>
          {isEditing && (
            <img 
              src={PencilIcon} 
              alt="Edit Pencil"
              className="edit-icon"
              onClick={() => handleSocialEditClick("instagram")}
            />
          )}
        </div>

        <div className="social-icon-container">
        <a href={socialLinks?.facebook || '#'} target="_blank" rel="noopener noreferrer">
  <img src={FacebookIcon} alt="Facebook" width="40" height="40" />
</a>
          {isEditing && (
            <img 
              src={PencilIcon} 
              alt="Edit Pencil"
              className="edit-icon"
              onClick={() => handleSocialEditClick("facebook")}
            />
          )}
        </div>

        <div className="social-icon-container">
        <a href={socialLinks?.twitter || '#'} target="_blank" rel="noopener noreferrer">
  <img src={TwitterIcon} alt="Twitter" width="40" height="40" />
</a>
          {isEditing && (
            <img 
              src={PencilIcon} 
              alt="Edit Pencil"
              className="edit-icon"
              onClick={() => handleSocialEditClick("twitter")}
            />
          )}
        </div>

        <div className="social-icon-container">
        <a href={socialLinks?.youtube || '#'} target="_blank" rel="noopener noreferrer">
  <img src={YouTubeIcon} alt="YouTube" width="40" height="40" />
</a>
          {isEditing && (
            <img 
              src={PencilIcon} 
              alt="Edit Pencil"
              className="edit-icon"
              onClick={() => handleSocialEditClick("youtube")}
            />
          )}
        </div>
      </div>

      <div className='Copy-location'>
  <div className="location">
    <img src={BrazilIcon} alt="Brasil" className="brazil-icon"/>
    <p>Brasil</p>
  </div>
  <div className="copyright">
    
    <p>&copy; 2024, All Rights Reserved by Compass UOL</p>
  </div>
</div>



      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Adicionar Link</h3>
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Digite a URL"
            />
            <div className="modal-buttons">
              <button onClick={handleModalClose} className='Cancel'>Cancelar</button>
              <button onClick={handleModalSave}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
