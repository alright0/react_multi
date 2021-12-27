import React from "react";
import add from "./../../../assets/img/add.png";
import s from "./../AddImage/AddImageButton/AddImage.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { getProtocol, addScreen } from "../../../api/queries/protocolQueries";

let AddScreen = (props) => {

  const [addNewScreen, { loading, error }] = useMutation(addScreen, {
    refetchQueries: [{ query: getProtocol, variables: { id: props.parent } }],
    onError(err) {
      return <span>{err.message}</span>;
    },
  })

  let addScreenForm = (protocolId) => {
    let key = Date.now();

    addNewScreen({
      variables: {
        title: "",
        type: "TextScreen",
        description: "",
        parent: protocolId,
        key: key,
      }
    })
  }

  return (
    <div className={s.addFile} onClick={() => {addScreenForm(props.parent)}}>
      <img src={add} alt="add" /> Добавить Экран
    </div>
  );
};

export default AddScreen;
