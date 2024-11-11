import React, { useState } from "react";
import "./Experiences.css";
import PlusIcon from "../../Assets/gg_add.svg";
import Trash from "../../Assets/Vector (4).svg";
import Pencil from "../../Assets/icon-park-solid_edit.svg";

type Experience = {
  title: string;
  period: string;
  skills: string[];
  description: string;
  repoLink: string;
};

type ExperiencesProps = {
  isEditing: boolean;
  experiences: Experience[];
  onAddExperience: (experience: Experience) => void;
  onDeleteExperience: (index: number) => void;
  onEditExperience: (index: number, updatedExperience: Experience) => void;
  
};

const Experiences: React.FC<ExperiencesProps> = ({
  isEditing,
  experiences,
  onAddExperience,
  onDeleteExperience,
  onEditExperience,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    title: "",
    period: "",
    skills: [],
    description: "",
    repoLink: "",
  });

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Experience
  ) => {
    setNewExperience({ ...newExperience, [field]: e.target.value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setNewExperience({ ...newExperience, skills });
  };

  const handleAddExperience = () => {
    const userKey = "fulano"; 
    if (userKey) {
      const updatedExperiences = [...experiences, newExperience];
      localStorage.setItem(`experiences-${userKey}`, JSON.stringify(updatedExperiences));
      onAddExperience(newExperience);
    }
    setIsModalOpen(false);
    setNewExperience({
      title: "",
      period: "",
      skills: [],
      description: "",
      repoLink: "",
    });
  };

  return (
    <div className="experiences-container">
      <h3>Experiências</h3>
      <div className="experiences-box">
        {isEditing && (
          <div className="add-experience" onClick={() => setIsModalOpen(true)}>
            <img src={PlusIcon} alt="Adicionar" />
            <span>Adicionar Card</span>
          </div>
        )}

        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <h4>{exp.title}</h4>
              <p className="year">{exp.period}</p>
              <div className="skills">
                {exp.skills.map((skill, idx) => (
                  <span key={idx}>{skill}</span>
                ))}
              </div>
              <div className="description">{exp.description}</div>
              {exp.repoLink && (
                <a
                  href={exp.repoLink}
                  className="repo-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Repositório
                </a>
              )}
              {isEditing && (
                <div className="card-actions">
                  <button
                    className="edit"
                    onClick={() => onEditExperience(index, exp)}
                  >
                    <img src={Pencil} alt="Editar" />
                  </button>

                  <button
                    className="delete"
                    onClick={() => onDeleteExperience(index)}
                  >
                    <img src={Trash} alt="Excluir" />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="Noting">Não há nada por aqui!</p>
        )}
      </div>

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
              value={newExperience.skills.join(",")}
              onChange={handleSkillsChange}
              placeholder="Habilidades (Separe-as por vírgulas)"
            />
            <textarea
              value={newExperience.description}
              onChange={(e) => handleExperienceChange(e, "description")}
              placeholder="Descreve a sua experiência"
            />
            <input
              type="text"
              value={newExperience.repoLink}
              onChange={(e) => handleExperienceChange(e, "repoLink")}
              placeholder="Link do repositório (Opcional)"
            />
            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button
                className="save"
                onClick={handleAddExperience}
                disabled={
                  !newExperience.title ||
                  !newExperience.period ||
                  !newExperience.skills.length ||
                  !newExperience.description
                }
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

