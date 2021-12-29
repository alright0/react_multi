import s from "./preloader.module.css";
import React from "react";
import { Spin } from "antd";

let Preloader = (props) => {
  return (
    <div className={s.preloader}>
      <Spin size="large" />
    </div>
  );
};

export default Preloader;
