import React from "react";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <header className="header">
      <Link to={"/"} className="header__logo">
        <img
          src="https://eco-recitec.com.br/images/logo/logo-recitec-02-02.png"
          alt="EcoRecitec Logo"
        />
      </Link>
      <nav className="header__nav">
        <Link
          to={"/participantes"}
          className={`header__link link-${
            window.location.pathname == "/participantes" && "active"
          }`}
        >
          Participantes
        </Link>
        <Link
          to={"/"}
          className={`header__link link-${
            window.location.pathname == "/" && "active"
          }`}
        >
          Validação
        </Link>
      </nav>
    </header>
  );
};

export default HomeHeader;
