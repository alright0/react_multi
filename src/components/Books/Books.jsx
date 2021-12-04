import React, { useEffect, useState } from "react";
import s from "./Books.module.css";
import Preloader from "./../common/preloader/Preloader";
import AddBook from "./AddBook/AddBook";
import DeleteBook from "../Books/deleteBook/DeleteBook";

let Books = (props) => {
  let [categories, setCategories] = useState([]);
  let [AddModalOpen, setAddModalOpen] = useState(false);
  let [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => props.getBooks(), []);

  console.log("rerendered");

  let newCategories = () => {
    return [...new Set(props.books.flatMap(({ category }) => category))];
  };

  return (
    <div>
      <div className={s.container}>
        {!props.books ? (
          <Preloader />
        ) : (
          props.books.map((data) => (
            <ul>
              {data.category}
              {props.books.map((item) => {
                if (item.category === data.category) {
                  <li>
                    {item.author} - {item.title}
                  </li>;
                }
              })}
            </ul>
          ))
        )}
      </div>
      <button onClick={() => setAddModalOpen(true)}> Добавить книгу </button>
      <button onClick={() => setDeleteModalOpen(true)}> Удалить книгу </button>
      <AddBook
        isOpen={AddModalOpen}
        addBook={props.addBook}
        closeModal={() => {
          setAddModalOpen(false);
        }}
      />
      <DeleteBook
        isOpen={deleteModalOpen}
        deleteBook={props.deleteBook}
        books={props.books}
        closeModal={() => {
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default Books;
