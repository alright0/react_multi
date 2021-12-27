import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

const NavbarComponent = ({ link, title }) => {
  return (
    <div className={s.item}>
      <NavLink end to={link}>
        {title}
      </NavLink>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className={s.nav}>
      <NavbarComponent link="/books" title="Books" />
      <NavbarComponent link="/protocollist" title="Protocol List" />
      <NavbarComponent link="/" title="Home" />
    </div>
  );
};

export default Navbar;
