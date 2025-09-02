import React from "react";
import "./ParticipantData.css";

const ParticipantData = ({ user, setUser, onDelete }) => {
  if (!user) {
    return null;
  }

  const userEntries = Object.entries(user);
  const excludedKeys = ["id", "status"];

  return (
    <div className="participantData-container">
      <div className="participantData__container--2">
        <button
          type="button"
          className="participantData__closeParticipantData"
          onClick={() => setUser(null)}
        >
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
        <h2 className="participantData__nameTitle">{user.nome}</h2>
        <span
          className={`status-badge status-badge--${
            user.status === "utilizado" ? "entered" : "pending"
          }`}
        >
          {user.status === "utilizado" ? "Entrou" : "Pendente"}
        </span>

        <div className="participantData__details">
          <h3>Informações do Participante:</h3>
          <ul className="participantData__list">
            {userEntries
              .filter(([key]) => !excludedKeys.includes(key))
              .map(([key, value]) => (
                <li key={key} className="participantData__listItem">
                  <span className="participantData__label">{key}:</span>
                  <span className="participantData__value">{value}</span>
                </li>
              ))}
          </ul>
          <div className="participantData__bottomDiv">
            <button
              type="button"
              className="deleteBtn"              
              onClick={() => onDelete(user)}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantData;
