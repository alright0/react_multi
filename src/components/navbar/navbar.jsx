import React from "react";
import { NavLink } from "react-router-dom";
import s from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={s.nav}>
      <div className={s.item}>
        <NavLink to="/books">Books</NavLink>
      </div>
      <div className={s.item}>
        <NavLink end to="/hooks">
          Hooks
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink end to="/">
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
