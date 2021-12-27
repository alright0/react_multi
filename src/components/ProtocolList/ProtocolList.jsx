import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { addProtocols, addProtocol } from "../../api/queries/protocolQueries";
import Preloader from "../common/Preloader/Preloader";
import { useNavigate } from "react-router-dom";
import AddProtocolModal from "./AddProtocol/AddProtocol";
import s from "./ProtocolList.module.css";

let ProtocolList = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data, loading, error } = useQuery(addProtocols);
  const protocols = data ? data.protocols.edges : null;
  const navigate = useNavigate();
  const [addNewProtocol, { err }] = useMutation(addProtocol, {
    onError(err) {
      return <span>{err.message}</span>;
    },
    refetchQueries: [{ query: addProtocols }],
  });

  return (
    <div className={s.protocolContainer}>
      {error && <div>{error.message}</div>}
      {loading && <Preloader />}
      {!loading && !error && (
        <>
          <button
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            создать протокол
          </button>
          <table>
            {protocols.map((protocol) => (
              <tr key={protocol.node.id}>
                <td>
                  <a href={`protocol/edit/${protocol.node.id}/`}>{protocol.node.title}</a>
                </td>
                <td> {protocol.node.type}</td>
                <td> {protocol.node.created}</td>
              </tr>
            ))}
          </table>
          <AddProtocolModal
            isOpen={modalIsOpen}
            closeModal={() => {
              setModalIsOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ProtocolList;
