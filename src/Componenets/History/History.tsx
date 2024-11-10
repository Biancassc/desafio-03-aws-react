import React from "react";

type HistoryProps = {
  isEditing: boolean;
  history: string;
  onHistoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const History: React.FC<HistoryProps> = ({ isEditing, history, onHistoryChange }) => {
  return (
    <div>
      <h3>Minha História</h3>
      {isEditing ? (
        <input
          type="text"
          value={history}
          onChange={onHistoryChange} 
          placeholder={history === "" ? "Adicione sua história" : ""} 
        />
      ) : (
        <p>{history.trim() === "" ? "Não há nenhuma história para contar!" : history}</p> 
      )}
    </div>
  );
};

export default History;



