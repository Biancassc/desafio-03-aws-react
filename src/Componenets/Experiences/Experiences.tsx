import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import "./Experiences.css";

type Experience = {
  title: string;
  period: string;
  skills: string;
  description: string;
  repoLink: string;
};

type ExperiencesProps = {
  isEditing: boolean;
  experiences: Experience[];
  onAddExperience: (experience: Experience) => void;
  onDeleteExperience: (index: number) => void;
};

const Experiences: React.FC<ExperiencesProps> = ({ isEditing, experiences, onAddExperience, onDeleteExperience }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    title: "",
    period: "",
    skills: "",
    description: "",
    repoLink: "",
  });

  
  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Experience
  ) => {
    setNewExperience({ ...newExperience, [field]: e.target.value });
  };

 
  const handleAddExperience = () => {
    onAddExperience(newExperience);  
    setIsModalOpen(false);  
    setNewExperience({
      title: "",
      period: "",
      skills: "",
      description: "",
      repoLink: "",
    });  
  };

  const handleSaveExperience = () => {
    return newExperience.title && newExperience.period && newExperience.skills && newExperience.description;
  };

  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="experiences">
      <h3>Experiências</h3>
      {experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <h4>{exp.title}</h4>
            <p>{exp.period}</p>
            <p>{exp.skills}</p>
            <p>{exp.description}</p>
            {exp.repoLink && <a href={exp.repoLink} target="_blank" rel="noopener noreferrer">Repositório</a>}
            {isEditing && (
              <button onClick={() => onDeleteExperience(index)}>Excluir</button>
            )}
          </div>
        ))
      ) : (
        <p>Não há nada por aqui!</p>
      )}

      {isEditing && (
        <div className="add-experience" onClick={() => setIsModalOpen(true)}>
          <MdAdd size={24} /> Adicionar Experiência
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Criação de Card</h3>
            <input
              type="text"
              value={newExperience.title}
              onChange={(e) => handleExperienceChange(e, "title")}
              placeholder="Título"
            />
            <input
              type="text"
              value={newExperience.period}
              onChange={(e) => handleExperienceChange(e, "period")}
              placeholder="Período de atuação"
            />
            <input
              type="text"
              value={newExperience.skills}
              onChange={(e) => handleExperienceChange(e, "skills")}
              placeholder="Habilidades (separe por vírgulas)"
            />
            <textarea
              value={newExperience.description}
              onChange={(e) => handleExperienceChange(e, "description")}
              placeholder="Descrição"
            />
            <input
              type="text"
              value={newExperience.repoLink}
              onChange={(e) => handleExperienceChange(e, "repoLink")}
              placeholder="Link do Repositório (opcional)"
            />
            <div className="modal-actions">
              <button onClick={handleModalClose}>Cancelar</button>
              <button
                onClick={handleAddExperience}
                disabled={!handleSaveExperience()}
                style={{
                  backgroundColor: handleSaveExperience() ? "blue" : "gray",
                  cursor: handleSaveExperience() ? "pointer" : "not-allowed"
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experiences;



