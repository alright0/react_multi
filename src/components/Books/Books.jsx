import React, { useEffect } from "react";
import s from "./Books.module.css";
import Preloader from "./../common/preloader/Preloader";
import AddBook from "./AddBook/AddBook";

let Books = (props) => {
  useEffect(() => props.getBooks(), []);

  return (
    <div>
      <div className={s.container}>
        {!props.books ? (
          <Preloader />
        ) : (
          props.books.map((data) => (
            <div className={s.title} key={data.id}>
              <p>Произведение</p>
              {data.title}
            </div>
          ))
        )}
      </div>
      <div className={s.container}>{<AddBook addBook={props.addBook} />}</div>
    </div>
  );
};

export default Books;
