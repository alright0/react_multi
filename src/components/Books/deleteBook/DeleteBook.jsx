import React from "react";
import s from "./../AddBook/addBook.module.css";
import { Field, reduxForm } from "redux-form";

let DeleteBook = (props) => {
  let getFormData = (values) => {
    if (values.bookId) {
      props.deleteBook(values.bookId);
      props.closeModal();
    }
  };

  // отрисовка формы
  return (
    <React.Fragment>
      {props.isOpen && (
        <div className={s.modal}>
          <div className={s.modalBody}>
            <DeleteBookForm onSubmit={getFormData} books={props.books} />
            <button onClick={props.closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const DeleteForm = (props) => {
  let booksList = props.books.map((book) => {
    return (
      <option value={book.id} key={book.id}>
        {book.author} - {book.title}
      </option>
    );
  });

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="deleteBookSelect">Книга:</label>
        <Field component="select" name="bookId" placeholder="Выберите Книгу">
          <option value="" disabled defaultValue hidden>
            Выберите книгу
          </option>
          {booksList}
        </Field>
      </div>

      <div>
        <button>Удалить книгу</button>
      </div>
    </form>
  );
};

const DeleteBookForm = reduxForm({ form: "deleteBook" })(DeleteForm);

export default DeleteBook;
