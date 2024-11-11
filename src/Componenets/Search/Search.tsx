import { useState, KeyboardEvent, useEffect } from "react";
import { auth, githubProvider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import ArrowRight from "../../Assets/arrow-right (1).svg"
import GitHugLogo from "../../Assets/mingcute_github-fill.svg"

type SearchProps = {
  loadUser: (userName: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState<{
    login: string | undefined;
    avatar_url: string | null;
    email: string | null;
    bio: string | null;
    location: string;
  } | null>(null);
  const fetchUsersFromLocalStorage = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers); 
      return users;
    }
    return [];
  };

  const filterUsers = (query: string) => {
    const users = fetchUsersFromLocalStorage();
    const filteredUsers = users.filter((user: { login: string }) =>
      user.login.toLowerCase().includes(query.toLowerCase()) 
    );
    return filteredUsers.map((user: { login: string }) => user.login);
  };

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setUserName(query);
    if (query) {
      const filteredSuggestions = filterUsers(query);
      setSuggestions(filteredSuggestions);
      setShowDropdown(true); 
    } else {
      setSuggestions([]);
      setShowDropdown(false); 
    }
  };
  const handleSelectUser = (selectedUser: string) => {
    setUserName(selectedUser);
    loadUser(selectedUser);
    setShowDropdown(false); 
  };

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
   
      
      localStorage.setItem("users", JSON.stringify(users)); 
      

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
    {showDropdown && suggestions.length > 0 && (
        <div className="dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelectUser(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

    <div className="dividerAll">
      <div className="line"></div>
      <span className="divider">ou</span>
      <div className="line"></div>
    </div>
  
    <div className="github-login">
    <h4>Acesse sua conta com</h4>
    <button className="button-github" onClick={handleGitHubLogin}>
      <img src={GitHugLogo} alt="github Logo " /> GitHub
    </button>
  </div>  
</div>  
  
  );
};

export default Search;
