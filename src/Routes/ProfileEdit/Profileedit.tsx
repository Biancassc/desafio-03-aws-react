import React, { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { UserProps } from "../../Types/users";
import Footer from "../../Componenets/Footer/Footer";
import Header from "../../Componenets/Header/Header";
import History from "../../Componenets/History/History";
import Experiences from "../../Componenets/Experiences/Experiences";
import { MdEdit, MdCheck } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Email from "../../Componenets/Email/Email";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state as UserProps | null;

  const isLoggedIn = !!localStorage.getItem("authToken");
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.login || "Fulano"); 
  const [history, setHistory] = useState<string>(localStorage.getItem("history") || "");
  const [email, setEmail] = useState<string>(localStorage.getItem("userEmail") || "");

  const [experiences, setExperiences] = useState<any[]>(() => {
    const savedExperiences = localStorage.getItem(`experiences-${user?.login}`);
    return savedExperiences ? JSON.parse(savedExperiences) : [];
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: user ? `https://www.instagram.com/${user.login}` : '',
    facebook: user ? `https://www.facebook.com/${user.login}` : '',
    twitter: user ? `https://twitter.com/${user.login}` : '',
    youtube: user ? `https://www.youtube.com/${user.login}` : '',
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(`experiences-${user.login}`, JSON.stringify(experiences));
    }
  }, [experiences, user]);

  const handleSocialLinkEdit = (social: string, newLink: string) => {
    setSocialLinks(prevLinks => ({
      ...prevLinks,
      [social]: newLink
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistory(e.target.value);
    localStorage.setItem("history", e.target.value);
  };

  const handleAddExperience = (experience: any) => {
    if (user) {
      const updatedExperiences = [...experiences, experience];
      localStorage.setItem(`experiences-${user.login}`, JSON.stringify(updatedExperiences));
      onAddExperience(experience);
    }
    setIsModalOpen(false);
    setNewExperience({
      title: "",
      period: "",
      skills: [],
      description: "",
      repoLink: "",
    });
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  if (!user) {
    return <p>Usuário não encontrado!</p>;
  }

  return (
    <div>
      <Header isProfileEdit={true} />
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-photo">
              <img
                src={user.avatar_url}
                alt="foto de perfil"
                className="profile-avatar"
              />
            </div>

            <div className="user-info">
            <h2>
               
                {isEditing ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={handleUserNameChange}
                    className="editable-name"
                  />
                ) : (
                  userName
                )}
              </h2>

              {user.location && (
                <p>
                  <MdLocationPin />
                  <span>{user.location}</span>
                </p>
              )}
              <h3>{user.email}</h3>
            </div>
            <h1 className="greeting">Hello, I'm </h1>
          </div>
          <div className="edit-button-container">
            <button onClick={handleEditClick} className="edit-button">
              {isEditing ? <MdCheck size={24} /> : <MdEdit size={24} />}
            </button>
          </div>

          <div className="social-links">
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>GitHub</button>
            </a>
            <a
              href={`https://www.linkedin.com/in/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>LinkedIn</button>
            </a>
            <History
              isEditing={isEditing}
              history={history}
              onHistoryChange={handleHistoryChange}
            />
            <Experiences
              isEditing={isEditing}
              experiences={experiences}
              onAddExperience={handleAddExperience}
              onDeleteExperience={handleDeleteExperience}
            />
            <Email
              isEditing={isEditing}
              email={email}
              onEmailChange={setEmail}
            />
          </div>
        </div>
      </div>
      <Footer
        socialLinks={socialLinks}
        isEditing={isEditing}
        onSocialLinkEdit={handleSocialLinkEdit}
      />
    </div>
  );
};

export default ProfileEdit;

