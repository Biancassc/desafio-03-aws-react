import React from "react";
import { UserProps } from "../../Types/users";
import { MdLocationPin } from "react-icons/md";

const User = ({avatar_url,login,location, bio,email}:UserProps) => {
    return(
        <div>
        <img src={avatar_url} alt={login} />
        <h2>{login}</h2>
        {location && (
            <p><MdLocationPin /> 
            <span>{location}</span>
        </p>
        )}
        
        <h2>{email}</h2>
        <div className="bio">
            <span>{bio}</span>
        </div>
        
    </div>
);
};
export default User;
