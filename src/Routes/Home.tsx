import React from "react";
import Search from "../Componenets/Search";

const Home = () => {
    const loadUser= async(userName:string) => {

    }
    return(
        <div>
            <Search loadUser={loadUser}/>

        </div>
    )
}   
  export default Home