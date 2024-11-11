import { MdLocationPin } from "react-icons/md";
import { UserProps } from "../../Types/users";
import Footer from "../../Componenets/Footer/Footer";
import Header from "../../Componenets/Header/Header";
import History from "../../Componenets/History/History";
import Experiences from "../../Componenets/Experiences/Experiences";
import Email from "../../Componenets/Email/Email";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./ProfileEdit.css";
import Edit from "../../Assets/edit-icon.svg";
import Check from "../../Assets/Vector (6).svg";

const ProfileEdit = () => {
  const location = useLocation();
  const user = location.state as UserProps | null;

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.login || "");
  const [history, setHistory] = useState(localStorage.getItem("history") || "");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [fullName, setFullName] =  useState(localStorage.getItem(`fullName-${user?.login}`) || user?.name || "Fulano");

  const [experiences, setExperiences] = useState<any[]>(() => {
    const savedExperiences = localStorage.getItem(`experiences-${user?.login}`);
    return savedExperiences ? JSON.parse(savedExperiences) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(`experiences-${user.login}`, JSON.stringify(experiences));
    }
  }, [experiences, user]);
  useEffect(() => {
    if (fullName) {
      localStorage.setItem(`fullName-${user?.login}`, fullName);
    }
  }, [fullName, user]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistory(e.target.value);
    localStorage.setItem("history", e.target.value);
  };

  const handleAddExperience = (experience: any) => {
    const updatedExperiences = [...experiences, experience];
    setExperiences(updatedExperiences);
    localStorage.setItem(`experiences-${user?.login}`, JSON.stringify(updatedExperiences));
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);  // Atualiza o nome completo
  };

  if (!user) {
    return <p>Usuário não encontrado!</p>;
  }

  return (
    <div>
      <Header isProfileEdit={true} userAvatar={user.avatar_url} />
      <div id="Header" className="edit-profile-container">
        <div className="edit-profile-left-info">
          <div className="edit-profile-photo">
            <img
              src={user.avatar_url}
              alt="foto de perfil"
              className="edit-profile-avatar"
            />
          </div>
          <div className="edit-profile-user-info">
            <h2>{userName}</h2>
            {user.location && (
              <p>
                <MdLocationPin />
                <span>{user.location}</span>
              </p>
            )}
            <h3>{user.email}</h3>
          </div>
        </div>

        <div className="edit-profile-right-info">
          <h1 className="edit-greeting">Hello, I'm</h1>
          <h2 className="username">
            {isEditing ? (
              <input
                type="text"
                value={fullName}  
                onChange={handleFullNameChange}  
                className="edit-editable-name"
              />
            ) : (
              fullName 
            )}
          </h2>
          <div className="edit-profile-bio">
            <span>{user.bio}</span>
          </div>
          <div className="edit-social-links">
            <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
              <button className="edit-github-button">GitHub</button>
            </a>
            <a href={user.blog} target="_blank" rel="noopener noreferrer">
              <button className="edit-linkedin-button">LinkedIn</button>
            </a>
          </div>
        </div>
      </div>
      <div className="edit-profile-below-info" id='History'>
        <History
          isEditing={isEditing}
          history={history}
          onHistoryChange={handleHistoryChange}
        />
        <div id="Experiences">
          <Experiences
            isEditing={isEditing}
            experiences={experiences}
            onAddExperience={handleAddExperience}
            onDeleteExperience={handleDeleteExperience}
          />
        </div>
      </div>
      <div id="footer">
        <Footer
          socialLinks={{
            instagram: `https://www.instagram.com/${user.login}`,
            facebook: `https://www.facebook.com/${user.login}`,
            twitter: `https://twitter.com/${user.login}`,
            youtube: `https://www.youtube.com/${user.login}`,
          }}
        />
      </div>

      <div className="edit-button-container">
        <button onClick={handleEditClick} className="edit-icon-button">
          {isEditing ? <img src={Check} alt="check" size={24} /> : <img src={Edit} alt="edit" size={24} />}
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;