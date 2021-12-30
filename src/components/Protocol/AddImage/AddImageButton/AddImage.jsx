import React, { useRef, useState } from "react";
import s from "./AddImage.module.css";
import add from "./../../../../assets/img/add.png";
import ImageForm from "../ImageForm/ImageForm";
import { useMutation } from "@apollo/client";
import { getProtocol, uplodateImage } from "../../../../api/queries/protocolQueries";

let AddImageButton = (props) => {
  const [uploadQuery] = useMutation(uplodateImage, {
    onError(error) {
      return <span>{error.message}</span>;
    },
    //onCompleted() {
    //  props.closeModal();
    //},
    refetchQueries: [{ query: getProtocol, variables: { id: props.parent } }],
  });

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

  let onFileSelected = (e, protocolId) => {
    let key = Date.now();

    let image = e.target.files[0];
    console.log(image);
    uploadQuery({ variables: { image, description: "123", parent: props.parent, key } });
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
