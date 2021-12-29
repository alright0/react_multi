import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { addProtocols, deleteProtocol } from "../../api/queries/protocolQueries";
import Preloader from "../common/Preloader/Preloader";
import AddProtocolModal from "./AddProtocol/AddProtocol";
import { Table, Tag, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { FileOutlined } from "@ant-design/icons";

let ProtocolList = (props) => {
  let buttonStyle = { width: "100%", margin: "5px 0 5px 0" };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data, loading, error } = useQuery(addProtocols);

  const [delProtocol, { err, load }] = useMutation(deleteProtocol, {
    refetchQueries: [{ query: addProtocols }],
  });

  const protocols = data ? data.protocols.edges : null;

  let deleteThisProtocol = (e, protocolId) => {
    delProtocol({ variables: { id: protocolId } });
  };

  let columns = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      render: (title, record) => <Link to={`/protocol/edit/${record.key}/`}>{title}</Link>,
    },
    { title: "Тип", dataIndex: "type" },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: () => (
        <>
          <Tag color="blue">Запланирован</Tag>
        </>
      ),
    },
    { title: "Создан", dataIndex: "created", key: "created" },
    { title: "Завершен", dataIndex: "finished", key: "finished" },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      render: (title, record) => {
        return (
          <Space>
            <Button type="primary" onClick={(e) => console.log("edit protocol")}>
              Изменить
            </Button>
            <Button type="primary" danger onClick={(e) => deleteThisProtocol(e, record.key)}>
              Удалить
            </Button>
          </Space>
        );
      },
    },
  ];

  let dataSource =
    !loading &&
    !error &&
    protocols.map((protocol) => {
      let created = new Date(protocol.node.created);

      return {
        key: protocol.node.id,
        title: protocol.node.title,
        type: protocol.node.type,
        created: created.toLocaleDateString(),
      };
    });

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      {error && <div>{error.message}</div>}
      {loading && <Preloader />}
      {!loading && !error && (
        <>
          <Button type="primary" icon={<FileOutlined />} style={buttonStyle} onClick={() => setModalIsOpen(true)}>
            Создать Новый Протокол
          </Button>

          <Table tableLayout="auto" columns={columns} dataSource={dataSource} onChange={onChange} />

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
