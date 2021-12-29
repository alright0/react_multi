import React from "react";
import { Field, reduxForm } from "redux-form";
import { useMutation } from "@apollo/client";
import { addProtocol, addProtocols } from "./../../../api/queries/protocolQueries";
import { required } from "../../../utils/reduxFormValidate";
import { Modal } from "antd";
import { customInput } from "../../../utils/reduxFormFields";

let AddProtocolModal = (props) => {
  const [addNewProtocol, { error, warning }] = useMutation(addProtocol, {
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

  return <AddNewProtocolForm onSubmit={createNewProtocol} isOpen={props.isOpen} closeModal={props.closeModal} />;
};

const AddProtocolForm = (props) => {
  return (
    <Modal
      visible={props.isOpen}
      onCancel={props.closeModal}
      onOk={props.handleSubmit}
      destroyOnClose={true}
      title="Новый Протокол"
    >
      <div>
        <Field component={customInput} name="title" validate={[required]} placeholder="Название" />
      </div>
      <div>
        <Field component={customInput} name="type" validate={[required]} placeholder="Тип" />
      </div>
    </Modal>
  );
};

const AddNewProtocolForm = reduxForm({ form: "addProtocolForm" })(AddProtocolForm);

export default AddProtocolModal;
