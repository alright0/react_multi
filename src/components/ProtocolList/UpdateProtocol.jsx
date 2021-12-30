import React from "react";
import { useMutation } from "@apollo/client";
import { updateProtocol, addProtocols } from "../../api/queries/protocolQueries";
import { Modal, Form } from "antd";
import { ProtocolListFormDialog } from "./ProtocolFormDialog";

let UpdateProtocolModal = (props) => {
  const [form] = Form.useForm();

  const [updateProtocolMutation] = useMutation(updateProtocol, {
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
      title="Изменить Протокол"
    >
      <ProtocolListFormDialog
        form={form}
        onFinish={(values) => updateProtocolMutation({ variables: { id: props.id, ...values } })}
      />
    </Modal>
  );
};

export default UpdateProtocolModal;
