import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { addProtocols } from "../../api/queries/protocolQueries";
import Preloader from "../common/Preloader/Preloader";
import AddProtocolModal from "./AddProtocol";
import { Table, Tag, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { FileOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateProtocolModal from "./UpdateProtocol";
import DeleteProtocolModal from "./DeleteProtocol";

let ProtocolList = (props) => {
  const buttonStyle = { width: "100%", margin: "5px 0 5px 0" };
  const tableStyle = { width: "100%", overflowX: "auto" };

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState({ isOpen: false });
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState({ isOpen: false });

  const { data, loading, error } = useQuery(addProtocols);

  const protocols = data ? data.protocols.edges : null;

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
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => setUpdateModalIsOpen({ isOpen: true, id: record.key })}
            >
              Изменить
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              onClick={() => setDeleteModalIsOpen({ isOpen: true, id: record.key })}
            >
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
          <Button type="primary" icon={<FileOutlined />} style={buttonStyle} onClick={() => setAddModalIsOpen(true)}>
            Создать Новый Протокол
          </Button>

          <Table
            style={tableStyle}
            tableLayout="auto"
            columns={columns}
            dataSource={dataSource}
            onChange={onChange}
            pagination={{ position: ["bottom", "left"] }}
          />

          <AddProtocolModal
            isOpen={addModalIsOpen}
            closeModal={() => {
              setAddModalIsOpen(false);
            }}
          />

          <DeleteProtocolModal
            isOpen={deleteModalIsOpen.isOpen}
            id={deleteModalIsOpen.id}
            closeModal={() => {
              setDeleteModalIsOpen(false);
            }}
          />

          <UpdateProtocolModal
            isOpen={updateModalIsOpen.isOpen}
            id={updateModalIsOpen.id}
            closeModal={() => {
              setUpdateModalIsOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ProtocolList;
