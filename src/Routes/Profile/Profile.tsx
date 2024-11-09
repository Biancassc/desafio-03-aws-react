
import { useLocation } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import React, { useState } from "react";
import { UserProps } from "../../Types/users"
import Footer from "../../Componenets/Footer/Footer"
import Header from "../../Componenets/Header/Header";


const Profile = () => {
  const location = useLocation();
  const user: UserProps = location.state;
   const [userName,] = useState("Fulano"); 
   
   return (
    <div>
      <Header />
      <div className="profile-container">
        {user ? (
          <div className="profile-content">
            <div className="profile-header">
             
              <div className="profile-photo">
                <img src={user.avatar_url} alt={user.login} className="profile-avatar" />
              </div>
              
              <div className="user-info">
                <h1 className="greeting">Hello, I'm {userName}</h1>
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


            <div className="bio">
              <span>{user.bio}</span>
            </div>

          
            <div className="social-links">
              <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                <button>GitHub</button>
              </a>
              <a href={`https://www.linkedin.com/in/${user.login}`} target="_blank" rel="noopener noreferrer">
                <button>LinkedIn</button>
              </a>
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