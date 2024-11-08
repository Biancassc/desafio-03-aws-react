import { FaGithub } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa'
import { useState, KeyboardEvent  } from 'react';



type SearchProps = {
  loadUser: (userName: string) => Promise<void>;
};
const Search =({loadUser}:SearchProps) =>{
    const [userName, setUserName] = useState("");


    const handleKeyDown = (e: KeyboardEvent)=>{
        if(e.key === "Enter"){
            loadUser(userName);
        };
     };
    
return (
    <div>
      <h1>Digite o nome do usuário que deseja buscar</h1>

      <div>
        <input
        className='search-box'
          type="text"
          placeholder="Digite o nome do usuário"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}

        />
        <button  onClick={() => loadUser(userName)} className='search-box-button'>
            <FaArrowRight/>
        </button>
      </div>

      <div>
        <div></div>
        <span className='divider'>ou</span>
        <div ></div>
      </div>

      <div className='github-login'>
       <h4> Acesse sua conta com </h4>
       </div>
        <button className='button-github'>
          <FaGithub/>
          GitHub
        </button>
    </div>
  );
};
export default Search;