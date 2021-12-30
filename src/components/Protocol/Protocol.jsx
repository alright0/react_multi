import React from "react";
import { useState } from "react";
import AddImage from "./AddImage/AddImageButton/AddImage";
import AddScreen from "./AddScreen/AddScreen";
import css from "./Protocol.module.css";
import TextScreen from "./Screens/TextScreen";
import { getProtocol } from "../../api/queries/protocolQueries";
import Preloader from "../common/Preloader/Preloader";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Menu, Dropdown, List, Image, Space } from "antd";
import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import { PageHeader, Descriptions, Tag, Button } from "antd";
import ImageScreen from "./Screens/ImageScreen";
import { MEDIA_URL } from "../../App";
import DeleteScreenModal from "./Screens/DeleteScreen";

let Protocol = (props) => {
  const MOCK_IMG = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

  const [isDeleteScreenOpen, setIsDeleteScreenOpen] = useState({ isOpen: false });
  const [isAddNewScreenOpen, setIsAddNewScreeOpen] = userState({false})
  const [isEditScreenOpen, setIsEditScreeOpen] = userState({false})

  const { protocolId } = useParams();

  const { data, loading, error } = useQuery(getProtocol, { variables: { id: protocolId } });
  const protocolData = data ? data.protocol : null;
  const screens = data ? data.protocol.screenSet.edges : null;

  const menu = (
    <Menu>
      <Menu.Item>Заметка</Menu.Item>
      <Menu.Item>Изображение</Menu.Item>
      <Menu.Item>Еще одно поле</Menu.Item>
    </Menu>
  );

  return (
    <div className={css.screenContainer}>
      {error && <div>{error.message}</div>}
      {loading && <Preloader />}
      {!loading && !error && (
        <div>
          <PageHeader title="TEST 124DW13" tags={<Tag color="blue">Running</Tag>}>
            <Descriptions size="small" column={window.innerWidth > 700 ? 3 : 1}>
              <Descriptions.Item label="Тип">{protocolData.type}</Descriptions.Item>
              <Descriptions.Item label="Название">{protocolData.title}</Descriptions.Item>
              <Descriptions.Item label="Создан">{new Date(protocolData.created).toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Статус">Запланирован</Descriptions.Item>
              <Descriptions.Item label="Инициатор">Иван Иванов</Descriptions.Item>
              <Descriptions.Item label="Цель">Целевая цель</Descriptions.Item>
              <Descriptions.Item label="Тестовая информация">Тестирование</Descriptions.Item>
            </Descriptions>
          </PageHeader>
          {screens && (
            <List
              header="Информация по тестам"
              itemLayout="vertical"
              size="large"
              dataSource={screens}
              footer={
                <Dropdown overlay={menu}>
                  <a onClick={(e) => e.preventDefault()}>
                    Добавить Компонент <DownOutlined />
                  </a>
                </Dropdown>
              }
              renderItem={(item) => (
                <List.Item
                  key={item.node.key}
                  item={item}
                  //id={item.node.id}
                  //parent={protocolId}
                  actions={[
                    <Space>
                      <Button
                        icon={<EditOutlined />}
                        //onClick={() => }
                      >
                        Изменить
                      </Button>

                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => setIsDeleteScreenOpen({ isOpen: true, id: item.node.id })}
                      >
                        Удалить
                      </Button>
                    </Space>,
                  ]}
                  extra={
                    item.node.image && (
                      <div className={css.imgResize}>
                        <Image src={`${MEDIA_URL}${item.node.image}`} />
                      </div>
                    )
                  }
                >
                  <List.Item.Meta
                    title={item.node.title}
                    description={
                      <div>
                        {new Date(item.node.created).toLocaleString()}
                        {"   "}
                        <Tag color="green">Производство</Tag>
                      </div>
                    }
                  />
                  {item.node.description}
                </List.Item>
              )}
            />
          )}
          <DeleteScreenModal
            isOpen={isDeleteScreenOpen.isOpen}
            id={isDeleteScreenOpen.id}
            closeModal={() => setIsDeleteScreenOpen(false)
            }
          />

            <AddNewScreenModal
            isOpen={isAddNewScreenOpen}
            closeModal={() => setIsAddNewScreeOpen(false)}
            />

            <EditScreenModal
            isOpen={isEditScreenOpen}
            closeModal={() => setIsEditScreeOpen(false)}
            />



          <div className={css.buttonField}>
            <AddImage parent={protocolId} />
            <AddScreen parent={protocolId} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Protocol;
