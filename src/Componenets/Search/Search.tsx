import { useState, KeyboardEvent, useEffect } from "react";
import { auth, githubProvider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import ArrowRight from "../../Assets/arrow-right (1).svg";
import GitHubLogo from "../../Assets/mingcute_github-fill.svg";
import AlertIcon from "../../Assets/Vector (5).svg";
import axios from "axios";

type SearchProps = {
  loadUser: (userName: string) => Promise<boolean>; 
};

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    login: string | undefined;
    avatar_url: string | null;
    email: string | null;
    bio: string | null;
    location: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      const userInformation = {
        login: user.displayName || user.email?.split('@')[0] || '',
        avatar_url: user.photoURL || '',
        email: user.email || '',
        bio: user.displayName || '',
        location: '',
      };
      
      const response = await axios.get(`https://api.github.com/users/${userInformation.login}`);
      const userGitHubData = response.data;
      userInformation.location = userGitHubData.location || 'Localização não disponível';

      setUserData(userInformation);
      setUserLoggedIn(true);
    } catch (error) {
      console.error("Erro ao logar com o GitHub:", error);
    }
  };

  const handleSearchUser = async () => {
    if (!userName) return;

    try {
      const userFound = await loadUser(userName);
      if (!userFound) {
        throw new Error("User not found");
      }
      setErrorMessage(null);
    } catch {
      setErrorMessage("O nome que você digitou não existe ou não está cadastrado!");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchUser();
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
          onChange={(e) => {
            setUserName(e.target.value);
            setErrorMessage(null);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearchUser}
          className={`search-box-button ${userName ? "search-box-button-active" : ""}`}
          disabled={!userName}
        >
          <img src={ArrowRight} alt="Arrow" />
        </button>
      </div>

      {errorMessage && (
        <div className="error-message">
          <img src={AlertIcon} alt="Alert icon" className="alert-icon" />
          {errorMessage}
        </div>
      )}

      <div className="dividerAll">
        <span className="divider">ou</span>
      </div>

      <div className="github-login">
        <h4>Acesse sua conta com</h4>
        <button className="button-github" onClick={handleGitHubLogin}>
          <img src={GitHubLogo} alt="GitHub Logo" /> GitHub
        </button>
      </div>
    </div>
  );
};

export default Search;

