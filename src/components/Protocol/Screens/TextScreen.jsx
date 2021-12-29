import React from "react";
import { useState } from "react";
import s from "./TextScreen.module.css";
import { useMutation } from "@apollo/client";
import { getProtocol, deleteScreen, updateScreen } from "../../../api/queries/protocolQueries";
import { Field, reduxForm } from "redux-form";

const TextScreen = (props) => {
  const [redactTitle, setRedactTitle] = useState("Редактировать");
  const [isDisabled, setIsDisabled] = useState(true);
  const [updateThisScreen, { e, l }] = useMutation(updateScreen, {
    onError(err) {
      return <span>{err.message}</span>;
    },
  });
  const [deleteThisScreen, { loading, error }] = useMutation(deleteScreen, {
    refetchQueries: [{ query: getProtocol, variables: { id: props.parent } }],
    onError(err) {
      return <span>{err.message}</span>;
    },
  });

  let delScreen = (id) => {
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
      <input type="text" placeholder="Название" disabled={isDisabled} />
      <textarea type="text" placeholder="Добавьте Комментарий..." rows={5} disabled={isDisabled} />
      <div className={s.buttonBlock}>
        <button onClick={redact}>{redactTitle}</button>
        <button onClick={() => delScreen(props.id)}>Удалить</button>
      </div>
    </div>
  );
};

const AddTextScreenForm = (props) => {};

const AddNewTextScreen = reduxForm({ form: "addTextScreenForm" })(AddTextScreenForm);

export default TextScreen;
