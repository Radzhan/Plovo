import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './NavBar.module.css';

const Navbar: React.FC = () => {
  return (
    <div className={`${ styles.nav } navbar navbar-expand-sm navbar-dark bg-primary`}>
      <div className="container-fluid">
        <span className="navbar-brand">Plovo</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Главная
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/new-dish" className="nav-link">
                Новое блюдо
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/orders" className="nav-link">
                Архив чеков
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;