import React from "react";
import s from "./TextScreen.module.css";

const TextScreen = (props) => {
  return (
    <div className={s.textScreen}>
      <input type="text" placeholder="Название" value={props.title} />
      <textarea type="text" placeholder="Добавьте Комментарий..." />
      <div className={s.buttonBlock}>
        <button>Сохранить</button>
        <button>Редактировать</button>
        <button
          onClick={() => {
            props.deleteScreen(props.item.node.key);
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TextScreen;
