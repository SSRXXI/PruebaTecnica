import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, NavItem } from "reactstrap";
import './Navigation.css';
import logo from '../images/icon.png';
import logo2 from '../images/icon-name-2.png';

import { isAuthenticated, signout } from "./apiCore";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
}

const Navigation = ({ history }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark aprendeya-color">
        <div className="container">
          <div className="logo">
            <NavItem className="nav-link">
              <Link className="nav-link" to="/">
                <img src={logo2} width="216" height="36" />
              </Link>
            </NavItem>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {!isAuthenticated() && (
                <>
                  <NavItem className="nav-link ">
                    <Link className="nav-link" to="/signup">
                      <a className="blanco">Registrarse</a>
                    </Link>
                  </NavItem>
                  <NavItem className="nav-link">
                    <Link className="nav-link" to="/signin">
                      <a className="blanco">Iniciar Sesión</a>
                    </Link>
                  </NavItem>
                </>
              )}
              {isAuthenticated() && (
                <>
                  <NavItem className="nav-link">
                    <Link to="/question/questionRand" className="nav-link">Hacer test rápido</Link>
                  </NavItem>
                  <NavItem className="nav-link">
                    <Link
                      to="/"
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })} className="nav-link">
                      Cerrar Sesión
                    </Link>
                  </NavItem>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navigation);
