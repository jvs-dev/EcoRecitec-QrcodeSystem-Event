import React from "react";
import "./ParticipantData.css";

const ParticipantData = ({ user, setUser }) => {
  if (!user) {
    return null;
  }

  // Use Object.entries() para obter um array de pares [chave, valor]
  const userEntries = Object.entries(user);

  // Lista de chaves a serem excluídas da exibição
  const excludedKeys = ["id", "status"];

  return (
    <div className="participantData-container">
      <div className="participantData__container--2">
        <button
          type="button"
          className="participantData__closeParticipantData"
          onClick={() => setUser(null)}
        >
          {/* Oculta a lista ao clicar no botão */}
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

        {/* --- Lista de Informações --- */}
        <div className="participantData__details">
          <h3>Informações do Participante:</h3>
          <ul className="participantData__list">
            {userEntries
              // Filtra as chaves que não devem ser exibidas
              .filter(([key]) => !excludedKeys.includes(key))
              .map(([key, value]) => (
                <li key={key} className="participantData__listItem">
                  <span className="participantData__label">{key}:</span>
                  <span className="participantData__value">{value}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParticipantData;
