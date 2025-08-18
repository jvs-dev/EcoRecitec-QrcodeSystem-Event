import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ParticipantList from "../components/ParticipantList";
import Header from "../components/header";

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

const AllParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const q = collection(db, "inscritos");
        const querySnapshot = await getDocs(q);
        const participantsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParticipants(participantsList);
      } catch (e) {
        console.log(e);
        setError("Falha ao buscar a lista de participantes.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchParticipants();
  }, []);

  if (isLoading)
    return <p className="loading">Carregando lista de participantes...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <Header />
      <div className="participants-page">
        <h2 className="participants-page__title">Lista de Participantes</h2>
        {participants.length > 0 ? (
          <ParticipantList participants={participants} />
        ) : (
          <p className="no-data">Nenhum participante encontrado.</p>
        )}
      </div>
    </>
  );
};

export default AllParticipants;
