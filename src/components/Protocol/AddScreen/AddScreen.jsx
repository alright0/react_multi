import React from "react";
import add from "./../../../assets/img/add.png";
import s from "./../AddImage/AddImageButton/AddImage.module.css";

let AddScreen = (props) => {
  return (
    <div className={s.addFile} onClick={props.addScreenForm}>
      <img src={add} alt="add" /> Добавить Экран
    </div>
  );
};

export default AddScreen;
