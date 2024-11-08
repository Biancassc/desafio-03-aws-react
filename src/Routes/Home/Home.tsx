
import Search from "../../Componenets/Search/Search";
import {useState} from "react";
import { UserProps } from '../../Types/users';
import {useNavigate} from "react-router-dom"
import User from "../../Componenets/User/User";
import Error from "../../Componenets//Error/Error";


const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

     const loadUser= async(userName:string) => {

        setError(false);
        setUser(null);


        const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json();
        if(res.status === 404){
            setError(true);
            return;
          }
      
       
        const { avatar_url, login, location, bio, email } = data;
        const userData: UserProps = {
          avatar_url,
          login,
          location,
          bio,
          email,
        };
        setUser(userData);
        
    
        navigate('/profile',{state:userData});
    };

    return(
        <div>
            <Search loadUser={loadUser}/>
            {user && <User {...user}/>}
            {error && <Error />}
        </div>
    )
}   
  export default Home