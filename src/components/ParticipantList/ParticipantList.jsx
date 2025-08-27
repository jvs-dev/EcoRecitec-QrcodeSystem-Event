import { useState } from "react";
import "./ParticipantList.css";

const ParticipantList = ({ participants, setUser }) => {
  const [list, setList] = useState(participants);
  const [message, setMessage] = useState("");
  const [qrcodeSendingIcon, setQrcodeSendingIcon] = useState("qr-code-outline");
  const [isFiltring, setIsFiltring] = useState(false);

  async function handleClick() {
    setQrcodeSendingIcon("refresh-outline");
    try {
      const emailResponse = await fetch(
        "https://ecorecitec-api.vercel.app/api/sendEventQrCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(list),
        }
      );
      if (emailResponse.ok) {
        console.log("E-mail com QRCode enviado com sucesso.");
        setQrcodeSendingIcon("checkmark-outline");
        setTimeout(() => {
          setQrcodeSendingIcon("qr-code-outline");
        }, 3000);
      } else {
        console.error(
          "Erro ao enviar e-mail com QRCode:",
          await emailResponse.text()
        );
      }
    } catch (emailError) {
      console.error("Erro de conexão ao enviar e-mail com QRCode:", emailError);
    }
  }

  function handleChange(enput) {
    let filteredParticipants = participants.filter(
      (participant) =>
        participant.nome
          .toLowerCase()
          .replace("ã", "a")
          .includes(enput.toLowerCase().replace("ã", "a")) ||
        participant.email.toLowerCase().includes(enput.toLowerCase()) ||
        participant.cpf.toLowerCase().includes(enput.toLowerCase()) ||
        participant.id.toLowerCase().includes(enput.toLowerCase())
    );
    if (filteredParticipants.length == 0) {
      setMessage("Nenhum participante encontrado com esse termo de pesquisa.");
    } else {
      setMessage("");
    }
    if (enput.replace(" ", "") == "") {
      setList(participants);
      return;
    }
    setList(filteredParticipants);
  }

  // Novo estado para o filtro
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = () => {
    setShowFilterModal(false);
    if (filterField && filterValue) {
      const filteredList = participants.filter((participant) =>
        String(participant[filterField])
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      );
      setList(filteredList);
      setIsFiltring(true);
      if (filteredList.length === 0) {
        setMessage("Nenhum participante encontrado com esse filtro.");
      } else {
        setMessage("");
      }
    } else {
      setList(participants);
      setIsFiltring(false);
      setMessage("");
    }
  };

  return (
    <>
      <div className="common-flexRow common-between maxwidth">
        <label htmlFor="searchInput" className="search-label">
          <ion-icon name="search-outline"></ion-icon>
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            placeholder="Pesquisar"
            onChange={(evt) => handleChange(evt.target.value)}
          />
        </label>
        <div className="common-flexRow">
          <button
            type="button"
            className="participant__filterBtn"
            style={{
              background: isFiltring == true ? "#1bd18b" : "",
            }}
            onClick={() => setShowFilterModal(true)}
          >
            <ion-icon name="filter-outline"></ion-icon>
          </button>
          <button
            className={`participant__sendQRCode ${
              qrcodeSendingIcon == "refresh-outline" ? "loading" : ""
            }`}
            style={{
              background:
                qrcodeSendingIcon == "checkmark-outline" ? "#14e293" : "",
            }}
            type="button"
            onClick={() => handleClick()}
          >
            <ion-icon name={`${qrcodeSendingIcon}`}></ion-icon>
          </button>
        </div>
      </div>
      <div className="participant-list">
        <table className="participant-list__table">
          <thead className="participant-list__header">
            <tr>
              <th className="participant-list__header-cell">Nome</th>
              <th className="participant-list__header-cell">Email</th>
              <th className="participant-list__header-cell">CPF</th>
              <th className="participant-list__header-cell">Código</th>
              <th className="participant-list__header-cell">Status</th>
            </tr>
          </thead>
          <tbody className="participant-list__body">
            {list.map((participant) => (
              <tr
                key={participant.id}
                className="participant-list__row"
                onClick={() => setUser(participant)}
              >
                <td className="participant-list__cell">
                  <strong>{participant.nome}</strong>
                </td>
                <td className="participant-list__cell">{participant.email}</td>
                <td className="participant-list__cell">{participant.cpf}</td>
                <td className="participant-list__cell">{participant.id}</td>
                <td className="participant-list__cell">
                  <span
                    className={`status-badge status-badge--${
                      participant.status === "utilizado" ? "entered" : "pending"
                    }`}
                  >
                    {participant.status === "utilizado" ? "Entrou" : "Pendente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message && <p className="tableError-message">{message}</p>}
      </div>

      {/* Modal de filtro */}
      {showFilterModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setShowFilterModal(false)}
            >
              &times;
            </span>
            <h2>Filtrar por Campo</h2>
            <div className="modal-body">
              <label>Campo:</label>
              <input
                type="text"
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
                placeholder="Ex: cidade"
              />
              <label>Valor:</label>
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Ex: Salvador"
              />
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={handleFilter}>
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para o modal, para garantir que ele seja exibido corretamente */}
      <style>
        {`
          .modal {
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            background-color: #fefefe;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            width: 90%;
            max-width: 500px;
            position: relative;
          }
          .close-button {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
          }
          .modal-body label {
            display: block;
            margin-top: 10px;
            font-weight: bold;
          }
          .modal-body input {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .modal-footer {
            margin-top: 20px;
            text-align: right;
          }
          .modal-button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default ParticipantList;
