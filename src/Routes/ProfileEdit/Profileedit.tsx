import React, { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { UserProps } from "../../Types/users";
import Footer from "../../Componenets/Footer/Footer";
import Header from "../../Componenets/Header/Header";
import History from "../../Componenets/History/History";
import Experiences from "../../Componenets/Experiences/Experiences";
import { MdEdit, MdCheck } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Email from "../../Componenets/Email/email";

const ProfileEdit = () => {
  const location = useLocation();
  const user = location.state as UserProps | null;

  const [isEditing, setIsEditing] = useState(false);
  const [history, setHistory] = useState<string>(
    localStorage.getItem("history") || ""
  );
  const [email, setEmail] = useState<string>(
    localStorage.getItem("userEmail") || ""
  );

  const [experiences, setExperiences] = useState<any[]>(() => {
    const savedExperiences = localStorage.getItem("experiences");
    return savedExperiences ? JSON.parse(savedExperiences) : [];
  });

  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistory(e.target.value);
    localStorage.setItem("history", e.target.value);
  };

  const handleAddExperience = (experience: any) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences, experience];
      return updatedExperiences;
    });
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
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
                alt={user.login}
                className="profile-avatar"
              />
            </div>

            <div className="user-info">
              <h1 className="greeting">Hello, I'm </h1>
              <h2>{user.login}</h2>
              {user.location && (
                <p>
                  <MdLocationPin />
                  <span>{user.location}</span>
                </p>
              )}
              <h3>{user.email}</h3>
            </div>
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
              rel="noopener noreferrer" >
              <button>GitHub</button>
            </a>
            <a
              href={`https://www.linkedin.com/in/${user.login}`}
              target="_blank"
              rel="noopener noreferrer">
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
      <Footer />
    </div>
  );
};

export default ProfileEdit;
