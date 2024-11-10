import React, { useState, useEffect } from "react";

interface EmailProps {
  isEditing: boolean;
  email?: string;
  onEmailChange?: (email: string) => void;
}

const Email: React.FC<EmailProps> = ({ isEditing, email, onEmailChange }) => {
  const [localEmail, setLocalEmail] = useState<string>(email || "");

  useEffect(() => {
    if (localEmail) {
      localStorage.setItem("userEmail", localEmail);
    } else {
      localStorage.removeItem("userEmail");
    }
  }, [localEmail]);


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setLocalEmail(newEmail);

    
    if (onEmailChange) {
      onEmailChange(newEmail);
    }
  };

  return (
    <div className="email-section">
      {isEditing ? (
        <div>
          <label>
            Adicione um e-mail adicional:
            <input
              type="email"
              value={localEmail}
              onChange={handleEmailChange}
              placeholder="Seu e-mail adicional"
            />
          </label>
          <p>Sinta-se livre para me contratar a qualquer momento!</p>
        </div>
      ) : (
      
        localEmail && (
          <div className="email-display">
            <p>Sinta-se livre para me contratar a qualquer momento!</p>
            <p>{localEmail}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Email;



