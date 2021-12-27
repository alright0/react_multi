import React from "react";
import { useState } from "react";
import AddImage from "./AddImage/AddImageButton/AddImage";
import AddScreen from "./AddScreen/AddScreen";
import s from "./Protocol.module.css";
import TextScreen from "./Screens/TextScreen";
import { getProtocol, addScreen, addProtocol } from "../../api/queries/protocolQueries";
import Preloader from "../common/Preloader/Preloader";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";



let Protocol = (props) => {
  const Screens = {
    TextScreen: TextScreen,
  };

  const {protocolId} = useParams()

  const { data, loading, error } = useQuery(getProtocol, { variables: { id: protocolId } });
  const protocolData = data ? data.protocol : null;
  const screens = data ? data.protocol.screenSet.edges : null;


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
                <ComponentType 
                  key={item.node.key} 
                  item={item} 
                  id={item.node.id} 
                  title={item.node.key}
                  parent={protocolId}
                  />
              );
            })}
          <div className={s.buttonField}>
            <AddImage /> 
            <AddScreen parent={protocolId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Protocol;
