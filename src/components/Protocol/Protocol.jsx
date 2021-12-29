import React from "react";
import { useState } from "react";
import AddImage from "./AddImage/AddImageButton/AddImage";
import AddScreen from "./AddScreen/AddScreen";
import css from "./Protocol.module.css";
import TextScreen from "./Screens/TextScreen";
import { getProtocol, addScreen, addProtocol } from "../../api/queries/protocolQueries";
import Preloader from "../common/Preloader/Preloader";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

let Protocol = (props) => {
  const Screens = {
    TextScreen: TextScreen,
  };

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
    <div>
      {error && <div>{error.message}</div>}
      {loading && <Preloader />}
      {!loading && !error && (
        <div>
          <div className={css.protocolDescription}>
            <div>
              <b>Тип:</b> {protocolData.type}
            </div>
            <div>
              <b>Название:</b> {protocolData.title}
            </div>
            <div>
              <b>Создан:</b> {new Date(protocolData.created).toLocaleString()}
            </div>
          </div>
          {screens &&
            screens.map((item) => {
              let ComponentType = Screens[item.node.type];
              return (
                <ComponentType
                  key={item.node.key}
                  item={item}
                  id={item.node.id}
                  title={item.node.key}
                  parent={protocolId}
                />
              );
            })}

          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              Добавить Компонент <DownOutlined />
            </a>
          </Dropdown>
          <div className={css.buttonField}>
            <AddImage />
            <AddScreen parent={protocolId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Protocol;
