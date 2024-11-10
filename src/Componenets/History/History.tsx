import React from "react";
import "./History.css";

type HistoryProps = {
  isEditing: boolean;
  history: string;
  onHistoryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Alteração para textarea
};

const History: React.FC<HistoryProps> = ({ isEditing, history, onHistoryChange }) => {
  return (
    <div className="history-section">
      <h3>Minha História</h3>
      {isEditing ? (
        <textarea
          value={history}
          onChange={onHistoryChange}
          placeholder={history === "" ? "Adicione sua história" : ""}
        />
      ) : (
        <p className={history.trim() === "" ? "empty" : ""}>
          {history.trim() === "" ? "Não há nenhuma história para contar!" : history}
        </p>
      )}
    </div>
  );
};

export default History;



