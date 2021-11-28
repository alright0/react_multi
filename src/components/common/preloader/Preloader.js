import s from "./preloader.module.css";
import loader from "./../../../assets/img/loading.gif";
import React from "react";

let Preloader = (props) => {
  return <div className={s.preloader}>{<img src={loader} alt="loader" />}</div>;
};

export default Preloader;
