import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, updateDoc, doc } from "firebase/firestore";
import QRCodeScanner from "../components/QRCodeScanner/QRCodeScanner";
import HomeHeader from "../components/Header/HomeHeader";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_APP_ID}`,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EntryValidation = () => {
  const [code, setCode] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  const handleVerify = async (inputCode) => {
    if (!inputCode) {
      setValidationResult({
        message: "Por favor, insira um código.",
        status: "error",
      });
      return;
    }

    setIsLoading(true);
    setValidationResult(null);

    try {
      const docRef = doc(db, "inscritos", `${inputCode}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const participantData = docSnap.data();

        if (participantData.status === "utilizado") {
          setValidationResult({
            message: `Ingresso já utilizado por: ${participantData.nome}`,
            status: "error",
            participant: participantData,
          });
        } else {
          const participantRef = doc(db, "inscritos", docSnap.id);
          await updateDoc(participantRef, { status: "utilizado" });

          setValidationResult({
            message: `Acesso Liberado para: ${participantData.nome}`,
            status: "success",
            participant: participantData,
          });
        }
      } else {
        setValidationResult({
          message: `Código '${inputCode}' não encontrado.`,
          status: "error",
        });
      }
    } catch (error) {
      console.error("Erro na validação:", error);
      setValidationResult({
        message: "Erro ao conectar com o banco de dados. Tente novamente.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
      setCode("");
      setIsScanning(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    handleVerify(code);
  };

  const handleScanResult = (scannedCode) => {
    setCode(scannedCode);
    handleVerify(scannedCode);
  };

  const handleRestartScan = () => {
    setIsScanning(true);
    setValidationResult(null);
  };

  return (
    <>
      <HomeHeader />
      <div className="entry-page">
        <h2 className="entry-page__title">Validação de Entrada</h2>

        {isScanning ? (
          <div className="card">
            <h3 className="card__title">Escanear QR Code</h3>
            <QRCodeScanner onScan={handleScanResult} />
          </div>
        ) : (
          <div className="card card--result">
            <h3 className="card__title">Resultado da Verificação</h3>
            {validationResult && (
              <div className={`result result--${validationResult.status}`}>
                <h4 className="result__message">{validationResult.message}</h4>
                {validationResult.participant && (
                  <p className="result__status">
                    Status:{" "}
                    <span className="result__status-value">
                      {validationResult.participant.status === "utilizado"
                        ? "Entrou"
                        : "Pendente"}
                    </span>
                  </p>
                )}
              </div>
            )}
            <button
              onClick={handleRestartScan}
              className="button button--primary"
            >
              Escanear Novamente
            </button>
          </div>
        )}

        <div className="card">
          <h3 className="card__title">Inserir Código Manualmente</h3>
          <form onSubmit={handleManualSubmit} className="form">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Digite o código aqui..."
              className="form__input"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="button button--primary"
            >
              {isLoading ? "Verificando..." : "Verificar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EntryValidation;
