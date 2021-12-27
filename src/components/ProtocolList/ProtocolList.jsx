import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { addProtocols, addProtocol } from "../../api/queries/protocolQueries";
import Preloader from "../common/Preloader/Preloader";
import s from "./ProtocolList.module.css";
import { useNavigate } from "react-router-dom";

let ProtocolList = (props) => {
  const { data, loading, error } = useQuery(addProtocols);
  const protocols = data ? data.protocols.edges : null;
  const navigate = useNavigate();
  const [addNewProtocol, {err}] = useMutation(addProtocol, {
    onError(err) {
      return <span>{err.message}</span>;
    },
    refetchQueries:[{query: addProtocols}]
  },
  )

  let createNewProtocol = () => {
    addNewProtocol({variables:{title: "Новый протокол", type: "TypeOne"}})
  }


  return (
    <div className={s.protocolContainer}>
      {error && <div>{error.message}</div>}
      {loading && <Preloader />}
      {!loading && !error && (
        <>
          <button onClick={createNewProtocol}>создать протокол</button>
          <table>
            {protocols.map((protocol) => (
              <tr key={protocol.node.id}>
                <td>
                  <a href={`protocol/edit/${protocol.node.id}/`}>{protocol.node.title}</a>
                </td>
                <td> {protocol.node.created}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  );
};

export default ProtocolList;
