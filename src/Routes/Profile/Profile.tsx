import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserProps } from "../../Types/users";
import Footer from "../../Componenets/Footer/Footer";
import Header from "../../Componenets/Header/Header";
import History from "../../Componenets/History/History";
import Experiences from "../../Componenets/Experiences/Experiences";
import Email from "../../Componenets/Email/Email";
import "./Profile.css";

const Profile = () => {
  const location = useLocation();
  const user: UserProps = location.state;
  const [userName] = useState(localStorage.getItem("UserName"));
  const [history, setHistory] = useState("Não há nenhuma história para contar");
  const [experiences, setExperiences] = useState<any[]>([]);
  const [email, setEmail] = useState<string>(localStorage.getItem("userEmail") || "");

  useEffect(() => {
    if (user) {
      const savedExperiences = localStorage.getItem(`experiences-${user.login}`);
      if (savedExperiences) {
        setExperiences(JSON.parse(savedExperiences));
      }
    }
  }, [user]);

  useEffect(() => {
    if (experiences.length > 0) {
      localStorage.setItem("experiences", JSON.stringify(experiences));
    }
  }, [experiences]);

  return (
    <div>
      <Header isProfileEdit={false} />
      <div className="profile-container" id="Header">
  {user ? (
    <div className="profile-content">
      <div className="left-info"> 
        <div className="profile-photo">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="profile-avatar"
          />
        </div>
        <div className="user-info">
          <h2>{user.login}</h2>
          {user.location && (
            <p>
              <span>{user.location}</span>
            </p>
          )}
          <h3>{user.email}</h3>
        </div>
      </div>

      <div className="right-info">
  <h1 className="greeting">
     Hello, <br></br>  I'm <span className="username">{user.name || user.login}</span>
  </h1>
  <div className="bio">
  <span>{user.bio || "Sem bio disponível"}</span>
</div>
        <div className="social-links">
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="github-button">GitHub</button>
          </a>
          <a
            href={`https://www.linkedin.com/in/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="linkedin-button">LinkedIn</button>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <p>Usuário não encontrado!</p>
  )}
</div>


      <div className="experiences-and-history"id='History'>
        <History
          isEditing={false}
          history={history}
          onHistoryChange={(e) => setHistory(e.target.value)}
        />
        <div className="experiences-section">
          {experiences.length === 0 ? (
            <div className="Noting">
              <h1>Experiências</h1>
              <p className="Noting">Não há nada por aqui!</p>
            </div>
          ) : (
            <div id="Experiences">
            <Experiences experiences={experiences} />
            </div>
          )}
        </div>
        <Email isEditing={false} email={email} />
      </div>
      <div id="footer">
      <Footer />
      </div>
    </div>
  );
};

export default Profile;


