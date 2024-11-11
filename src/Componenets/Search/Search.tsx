import { FaGithub } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState, KeyboardEvent, useEffect } from "react";
import { auth, githubProvider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import ArrowRight from "../../Assets/arrow-right (1).svg"

type SearchProps = {
  loadUser: (userName: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState<{
    login: string | undefined;
    avatar_url: string | null;
    email: string | null;
    bio: string | null;
    location: string;
  } | null>(null);
  

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      console.log("GitHub login successful:", user);

      const userInformation = {
        login: user.displayName || user.email?.split('@')[0] || '',
        avatar_url: user.photoURL || '',
        email: user.email || '',
        bio: user.displayName || '',
        location: '',
      };
      

      setUserData(userInformation);
      setUserLoggedIn(true);
    } catch (error) {
      console.error("Error during GitHub login:", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      loadUser(userName);
    }
  };

  useEffect(() => {
    if (userLoggedIn && userData) {
      navigate("/profileedit", { state: userData });
    }
  }, [navigate, userLoggedIn, userData]);

  return (
    <div className="container">
    <h1>Digite o nome do usuário que deseja buscar</h1>
  
    <div className="search-box-container">
      <input
        className="search-box"
        type="text"
        placeholder="Digite o nome do usuário"
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => loadUser(userName)}
        className="search-box-button"
      >
        <img src={ArrowRight} alt="Arrow" />
      </button>
    </div>
  
    <div>
      <div></div>
      <span className="divider">ou</span>
      <div></div>
    </div>
  
    <div className="github-login">
      <h4>Acesse sua conta com</h4>
    </div>
  
    <button className="button-github" onClick={handleGitHubLogin}>
      <FaGithub /> GitHub
    </button>
  </div>
  
  );
};

export default Search;
