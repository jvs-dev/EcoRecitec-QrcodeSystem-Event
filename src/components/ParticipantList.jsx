import { useState } from "react";

const ParticipantList = ({ participants }) => {
  const [list, setList] = useState(participants);
  const [message, setMessage] = useState("");

  async function handleClick() {
    console.log(list);
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
        console.log("E-mail de ecossistema enviado com sucesso.");
      } else {
        console.error(
          "Erro ao enviar e-mail de ecossistema:",
          await emailResponse.text()
        );
      }
    } catch (emailError) {
      console.error(
        "Erro de conexão ao enviar e-mail de ecossistema:",
        emailError
      );
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

  return (
    <div className="participant-list">
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
        <button
          className="participant__sendQRCode"
          type="button"
          onClick={() => handleClick()}
        >
          <ion-icon name="qr-code-outline"></ion-icon>
        </button>
      </div>
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
            <tr key={participant.id} className="participant-list__row">
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
  );
};

export default ParticipantList;
