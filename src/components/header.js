import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/header.scss";

export default function Header() {
  return (
    <nav className={styles.header}>
      <ul>
        <li>
          <NavLink to="/" className={styles.link} exact activeClassName={styles.active}>
            search
            <div className={styles.underline} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={styles.link} activeClassName={styles.active}>
            about
            <div className={styles.underline} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
