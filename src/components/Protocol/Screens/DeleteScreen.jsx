import React from "react";
import { useMutation } from "@apollo/client";
import { deleteScreen, getProtocol } from "./../../../api/queries/protocolQueries";
import { Modal } from "antd";
import { useParams } from "react-router-dom";

let DeleteScreenModal = (props) => {
  const { protocolId } = useParams();

  const [deleteScreenMutatiion] = useMutation(deleteScreen, {
    refetchQueries: [{ query: getProtocol, variables: { id: protocolId } }],
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
      onOk={() => deleteScreenMutatiion({ variables: { id: props.id } })}
      destroyOnClose={true}
      title="Удалить Запись"
    >
      <p>Вы уверены, что хотите удалить запись?</p>
    </Modal>
  );
};

export default DeleteScreenModal;
