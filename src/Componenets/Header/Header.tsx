import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/minha-historia">Minha História</Link></li>
          <li><Link to="/experiencias">Experiências</Link></li>
          <li><Link to="/contato">Contato</Link></li>
          <li><Link to="/entrar">Entrar</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;