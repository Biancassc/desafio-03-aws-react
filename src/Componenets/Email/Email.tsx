import React, { useState, useEffect } from "react";
import "./Email.css";

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

  if (!localEmail && !isEditing) {
    return null;
  }

  return (
    <div className={`email-section ${isEditing ? 'editing' : ''}`}>
      <div className="email-display">
        <p className="email-text">Sinta-se livre para me contratar a qualquer momento!</p>

        {isEditing ? (
          <>
            <input
              type="email"
              value={localEmail}
              onChange={handleEmailChange}
              placeholder="Adicione um e-mail adicional"
              className="email-input"
            />
          </>
        ) : (
          localEmail && <p className="email-address">{localEmail}</p>
        )}
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Email;


