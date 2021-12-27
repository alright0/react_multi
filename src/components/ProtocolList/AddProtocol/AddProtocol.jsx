import React from "react";
import { Field, reduxForm } from "redux-form";
import { useMutation } from "@apollo/client";
import { addProtocol, addProtocols } from "./../../../api/queries/protocolQueries";
import { required } from "../../../utils/reduxFormValidate";
import s from "./../ProtocolList.module.css";

let AddProtocolModal = (props) => {
  const [addNewProtocol, { err }] = useMutation(addProtocol, {
    onError(err) {
      return <span>{err.message}</span>;
    },
    onCompleted() {
      props.closeModal(true);
    },
    refetchQueries: [{ query: addProtocols }],
  });

  let createNewProtocol = (values) => {
    addNewProtocol({ variables: { title: values.title, type: values.type } });
  };

  return (
    <React.Fragment>
      {props.isOpen && (
        <div className={s.modal}>
          <div className={s.modalBody}>
            <AddNewProtocolForm onSubmit={createNewProtocol} />
            <button onClick={props.closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const AddProtocolForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <div>
          <Field component="input" name="title" placeholder="Название" />
        </div>
        <div>
          <Field component="input" name="type" placeholder="Тип" />
        </div>
        <div>
          <button>Добавить протокол</button>
        </div>
      </div>
    </form>
  );
};

const AddNewProtocolForm = reduxForm({ form: "addProtocolForm" })(AddProtocolForm);

export default AddProtocolModal;
