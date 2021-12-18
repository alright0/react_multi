import React, { useState } from "react";
import s from "./Books.module.css";
import Preloader from "./../common/preloader/Preloader";
import AddBook from "./AddBook/AddBook";
import DeleteBook from "./DeleteBook/DeleteBook";
import { getBooksQuery } from "../../api/queries/bookQueries";
import { useQuery } from "@apollo/react-hooks";

let Books = (props) => {
  let [AddModalOpen, setAddModalOpen] = useState(false);
  let [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data, loading, error } = useQuery(getBooksQuery);
  const books = data ? data.books.edges : null;

  console.log("rerendered");

  return (
    <div>
      {error && <div className={s.error}>{error.message}</div>}
      {loading && <Preloader />}
      {!loading && !error && (
        <div>
          <div className={s.container}>
            {books.map((book) => (
              <ul key={book.node.id}>
                {book.node.category} - {book.node.title}
              </ul>
            ))}
          </div>

          <button onClick={() => setAddModalOpen(true)}> Добавить книгу </button>
          <button onClick={() => setDeleteModalOpen(true)}> Удалить книгу </button>

          <AddBook
            isOpen={AddModalOpen}
            closeModal={() => {
              setAddModalOpen(false);
            }}
          />

          <DeleteBook
            isOpen={deleteModalOpen}
            books={books}
            closeModal={() => {
              setDeleteModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Books;
