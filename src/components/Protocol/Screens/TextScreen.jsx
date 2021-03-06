import React from "react";
import { useState } from "react";
import s from "./TextScreen.module.css";
import { useMutation } from "@apollo/client";
import { getProtocol, deleteScreen, updateScreen } from "../../../api/queries/protocolQueries";
import { Input } from "antd";

const TextScreen = (props) => {
  const [redactTitle, setRedactTitle] = useState("Редактировать");
  const [isDisabled, setIsDisabled] = useState(true);
  const [updateThisScreen] = useMutation(updateScreen, {
    onError(err) {
      return <span>{err.message}</span>;
    },
  });
  const [deleteThisScreen] = useMutation(deleteScreen, {
    refetchQueries: [{ query: getProtocol, variables: { id: props.parent } }],
    onError(err) {
      return <span>{err.message}</span>;
    },
  });

  let delScreen = () => {
    deleteThisScreen({ variables: { id: props.id } });
  };

  let redact = (values) => {
    setIsDisabled(!isDisabled);
    setRedactTitle(isDisabled ? "Закончить редактирование" : "Редактировать");
    isDisabled && updateThisScreen({ variables: { title: values.title, description: values.description } });
  };

  return (
    <div className={s.textScreen}>
      <label>Создан: {new Date(props.title).toLocaleString()}</label>
      {isDisabled ? <label>old value</label> : <Input type="text" placeholder="Название" />}
      <textarea type="text" placeholder="Добавьте Комментарий..." rows={5} disabled={isDisabled} />
      <div className={s.buttonBlock}>
        <button onClick={redact}>{redactTitle}</button>
        <button onClick={() => delScreen(props.id)}>Удалить</button>
      </div>
    </div>
  );
};

const AddTextScreenForm = (props) => {};

export default TextScreen;
