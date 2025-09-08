import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: #333;
    
    /* Fundo com degradê e padrão */
    background: #f0f4f8; /* Cor de fallback */
    background-image:
      /* Camada de padrão (pontos transparentes) */
      radial-gradient(#b1bed3 1px, transparent 1px),
      /* Camada de degradê */
      linear-gradient(135deg, #e9ecef, #f5f7fa);
    background-size: 20px 20px;
    background-position: 0 0, 0 0;
  }

  .login-page__container {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
    max-width: 400px;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .login-page__container:hover {
    transform: translateY(-5px);
  }

  .login-page__title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 2rem;
  }

  .login-page__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .login-page__input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    color: #2d3748;
    background-color: #f9fafb;
    outline: none;
    transition: all 0.2s ease;
  }

  .login-page__input:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }

  .login-page__button {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(45deg, #4a90e2, #357bd1);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(53, 123, 209, 0.3);
  }
  
  .login-page__button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(53, 123, 209, 0.4);
  }

  .login-page__error-message {
    color: #e53e3e;
    font-weight: 600;
    margin-top: 0.5rem;
  }
  
  .login-page__success-message {
    color: #38a169;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

function LoginValidation({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == `##mindset##`) {
      onSuccess();
    } else {
      setError("Senha incorreta");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-page__container">
        <h1 className="login-page__title">Sistema de Entrada</h1>
        <form onSubmit={handleSubmit} className="login-page__form">
          <input
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-page__input"
          />
          <button type="submit" className="login-page__button">
            Entrar
          </button>
        </form>
        {error && <span className="login-page__error-message">{error}</span>}
      </div>
    </>
  );
}

export default LoginValidation;
