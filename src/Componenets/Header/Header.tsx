import {useNavigate } from 'react-router-dom';
import "./Header.css";
import { auth, githubProvider } from "../../firebase-config";
import { signInWithPopup } from 'firebase/auth';
import VectorIcon from "../../Assets/solar_login-2-broken.svg"

interface HeaderProps {
    isProfileEdit?: boolean; 
    userAvatar?: string; 
  }
  
  const Header = ({ isProfileEdit, userAvatar }: HeaderProps) => {
    const navigate = useNavigate();
  

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
    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  return (
    <header className="header">
    <nav>
      <ul>
        <li><button onClick={() => scrollToSection('Header')}>Início</button></li>
        <li><button onClick={() => scrollToSection('History')}>Minha História</button></li>
          <li><button onClick={() => scrollToSection('Experiences')}>Experiências</button></li>
          <li><button onClick={() => scrollToSection('Footer')}>Contato</button></li>
      </ul>
    </nav>
  
    {isProfileEdit ? (
       <button onClick={handleLogout} className="logout">
       {userAvatar && (
         <img
           src={userAvatar} 
           alt="User Avatar"
           className="avatar-logout"
         />
       )}
       Sair
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