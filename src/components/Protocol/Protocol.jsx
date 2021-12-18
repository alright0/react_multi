import React from "react";
import { useState } from "react";
import AddImage from "./AddImage/AddImageButton/AddImage";
import AddScreen from "./AddScreen/AddScreen";
import s from "./Protocol.module.css";
import TextScreen from "./Screens/TextScreen";
import uniqid from "uniqid";
import { getProtocol } from "../../api/queries/protocolQueries";
import Preloader from "../common/preloader/Preloader";
import { Cache, useQuery } from "@apollo/client";
import { useEffect } from "react";

let Protocol = (props) => {
  const Screens = {
    TextScreen: TextScreen,
  };

  const { data, loading, error } = useQuery(getProtocol, { variables: { id: "UHJvdG9jb2xOb2RlOjI=" } });
  const protocolData = data ? data.protocol : null;
  const screens = data ? data.protocol.screenSet.edges : null;
  const [components, setComponents] = useState([]);

  let addScreenForm = () => {
    let key = Date.now();
    const [addScreen] = useMutation();
    //setComponents([...screens, { node: { key: key, type: "TextScreen" } }]);
  };

  let deleteScreen = (id) => {
    console.log(id);
    console.log(components);

    setComponents([...screens.filter((elem) => elem.node.key !== id)]);
  };

  //debugger;

  return (
    <div>
      {error && <div>{error.message}</div>}
      {loading && <Preloader />}
      {!loading && !error && (
        <div>
          <div>Тип: {protocolData.type}</div>
          <div>Название: {protocolData.title}</div>
          <div>Создан: {protocolData.created}</div>
          {screens &&
            screens.map((item) => {
              let ComponentType = Screens[item.node.type];
              return (
                <ComponentType key={item.node.key} item={item} deleteScreen={deleteScreen} title={item.node.key} />
              );
            })}
          <div className={s.buttonField}>
            <AddImage /> <AddScreen addScreenForm={addScreenForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Protocol;
