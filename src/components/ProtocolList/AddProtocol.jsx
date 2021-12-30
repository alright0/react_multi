import React from "react";
import { useMutation } from "@apollo/client";
import { addProtocol, addProtocols } from "../../api/queries/protocolQueries";
import { Modal, Form } from "antd";
import { ProtocolListFormDialog } from "./ProtocolFormDialog";

let AddProtocolModal = (props) => {
  const [form] = Form.useForm();

  const [addProtocolMutation] = useMutation(addProtocol, {
    onError(error) {
      return <span>{error.message}</span>;
    },
    onCompleted() {
      props.closeModal();
    },
    refetchQueries: [{ query: addProtocols }],
  });

  return (
    <Modal
      visible={props.isOpen}
      onCancel={props.closeModal}
      destroyOnClose={true}
      onOk={form.submit}
      title="Новый Протокол"
    >
      <ProtocolListFormDialog form={form} onFinish={(values) => addProtocolMutation({ variables: values })} />
    </Modal>
  );
};

export default AddProtocolModal;
