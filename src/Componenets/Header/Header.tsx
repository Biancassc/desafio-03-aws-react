import { Link,useNavigate } from 'react-router-dom';
import "./Header.css";
import { MdExitToApp } from 'react-icons/md';
import { auth, githubProvider } from "../../firebase-config";
import { signInWithPopup } from 'firebase/auth';
import VectorIcon from "../../Assets/solar_login-2-broken.svg"

interface HeaderProps {
    isProfileEdit?: boolean; 
  }
  
  const Header = ({ isProfileEdit }: HeaderProps) => {
    const navigate = useNavigate();
  
    // Função de Logout
    const handleLogout = () => {
     
      console.log('Logout');
      navigate('/');  
    };
  
   
    const handleGitHubLogin = async () => {
      try {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;
        console.log('GitHub login successful:', user);
        navigate('/profileedit', { state: { login: user.displayName, avatar_url: user.photoURL } });
      } catch (error) {
        console.error("Error during GitHub login:", error);
      }
    };
  return (
    <header className="header">
    <nav>
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/minha-historia">Minha História</Link></li>
        <li><Link to="/experiencias">Experiências</Link></li>
        <li><Link to="/contato">Contato</Link></li>
      </ul>
    </nav>
  
    {isProfileEdit ? (
      <button onClick={handleLogout} className="logout">
        <MdExitToApp /> Sair
      </button>
    ) : (
      <button onClick={handleGitHubLogin} className="login">
        <img src={VectorIcon} alt="Vector Icon" className="vector-icon" /> Entrar
      </button>
    )}
  </header>
  );
  }

export default Header;