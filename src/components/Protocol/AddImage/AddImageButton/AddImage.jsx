import React, { useRef, useState } from "react";
import s from "./AddImage.module.css";
import add from "./../../../../assets/img/add.png";
import ImageForm from "../ImageForm/ImageForm";

let AddImageButton = () => {
  let [isDrag, setIsDrag] = useState(false);
  const inputFileRef = useRef();

  let dragStartHandler = (e) => {
    e.preventDefault();
    setIsDrag(true);
  };

  let dragLeaveHandler = (e) => {
    e.preventDefault();
    setIsDrag(false);
  };

  let onDropHandler = (e) => {
    e.preventDefault();
    let files = e.dataTransfer.files[0];
    console.log(files);
    setIsDrag(false);
  };

  let onClickOpenFileDialog = (e) => {
    inputFileRef.current.click();
  };

  let onFileSelected = (e) => {
    let file = e.target.files[0];
  };

  return (
    <div
      onDragStart={dragStartHandler}
      onDragOver={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={onDropHandler}
      onClick={onClickOpenFileDialog}
      className={s.addFile}
    >
      <input type="file" ref={inputFileRef} onChange={onFileSelected} accept="image/*" />
      <img src={add} alt="add" />
      {!isDrag ? "Добавить Изображение" : "Отпустите файлы для загрузки"}
    </div>
  );
};

export default AddImageButton;
