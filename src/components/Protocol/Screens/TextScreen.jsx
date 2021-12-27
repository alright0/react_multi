import React from "react";
import { useState } from "react";
import s from "./TextScreen.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { getProtocol, deleteScreen, updateScreen } from "../../../api/queries/protocolQueries";

const TextScreen = (props) => {
  const [redactTitle, setRedactTitle] = useState("Редактировать");
  const [isDisabled, setIsDisabled] = useState(true);
  //const [updateThisScreen, {e,l}] = useMutation(updateScreen, {    onError(err) {
  //  return <span>{err.message}</span>;
  //},})
  const [deleteThisScreen, { loading, error }] = useMutation(deleteScreen, {
    refetchQueries: [{ query: getProtocol, variables: { id: props.parent } }],
    onError(err) {
      return <span>{err.message}</span>;
    },
  });

  let delScreen = (id) => {
    console.log(id);
    deleteThisScreen({
      variables: {
        id: props.id,
      },
    });
  };

  let redact = () => {
    setIsDisabled(!isDisabled);
    setRedactTitle(isDisabled ? "Закончить редактирование" : "Редактировать");
  };

  return (
    <div className={s.textScreen}>
      <label>id: {props.title}</label>
      <input type="text" placeholder="Название" disabled={isDisabled} />
      <textarea type="text" placeholder="Добавьте Комментарий..." rows={5} disabled={isDisabled} />
      <div className={s.buttonBlock}>
        <button onClick={redact}>{redactTitle}</button>
        <button
          onClick={() => {
            delScreen(props.id);
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TextScreen;
