import React from "react";
import { Link } from "react-router-dom";
// import { paths } from '../../routes/paths';

import "./Error.scss";

const Error = () => {
  return (
    <section className="section">
      <div className="container wrapper_error">
        <h1 className="wrapper_error__title">404</h1>
        <p className="wrapper_error__text">Страница не найдена</p>
        <Link className="wrapper_error__link" to="/f">
          Главная
        </Link>
      </div>
    </section>
  );
};

export default Error;
