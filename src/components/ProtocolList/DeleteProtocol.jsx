import React from "react";
import { useMutation } from "@apollo/client";
import { deleteProtocol, addProtocols } from "./../../api/queries/protocolQueries";
import { Modal } from "antd";

let DeleteProtocolModal = (props) => {
  const [deleleProtocolMutation] = useMutation(deleteProtocol, {
    refetchQueries: [{ query: addProtocols }],
    onError(error) {
      return <span>{error.message}</span>;
    },
    onCompleted() {
      props.closeModal();
    },
  });

  return (
    <Modal
      visible={props.isOpen}
      onCancel={props.closeModal}
      onOk={() => deleleProtocolMutation({ variables: { id: props.id } })}
      destroyOnClose={true}
      title="Удалить Протокол"
    >
      <p>Вы уверены, что хотите удалить протокол?</p>
    </Modal>
  );
};

export default DeleteProtocolModal;
