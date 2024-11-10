import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserProps } from "../../Types/users";
import Footer from "../../Componenets/Footer/Footer";
import Header from "../../Componenets/Header/Header";
import History from "../../Componenets/History/History";
import Experiences from "../../Componenets/Experiences/Experiences";
import Email from "../../Componenets/Email/email";
import "./Profile.css";

const Profile = () => {
  const location = useLocation();
  const user: UserProps = location.state;
  const [userName] = useState("Fulano");
  const [history, setHistory] = useState("Não há nenhuma história para contar");
  const [experiences, setExperiences] = useState<any[]>([]);
  const [email, setEmail] = useState<string>(
    localStorage.getItem("userEmail") || ""
  );

  useEffect(() => {
    const storedExperiences = localStorage.getItem("experiences");
    if (storedExperiences) {
      setExperiences(JSON.parse(storedExperiences));
    }
  }, []);

  useEffect(() => {
    if (experiences.length > 0) {
      localStorage.setItem("experiences", JSON.stringify(experiences));
    }
  }, [experiences]);

  return (
    <div>
      <Header isProfileEdit={false} />
      <div className="profile-container">
        {user ? (
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
                <h1 className="greeting">Hello, I'm {userName}</h1>
                <h2>{user.login}</h2>
                {user.location && (
                  <p>
                    
                    <span>{user.location}</span>
                  </p>
                )}
                <h3>{user.email}</h3>
              </div>
            </div>

            <div className="bio">
              <span>{user.bio}</span>
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
                isEditing={false}
                history={history}
                onHistoryChange={(e) => setHistory(e.target.value)}
              />
              <div className="experiences-section">
                <h3>Experiências</h3>
                {experiences.length === 0 ? (
                  <p>Não há nada por aqui!</p>
                ) : (
                  <Experiences experiences={experiences} />
                )}
                <Email isEditing={false} email={email} />
              </div>
            </div>
          </div>
        ) : (
          <p>Usuário não encontrado!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
