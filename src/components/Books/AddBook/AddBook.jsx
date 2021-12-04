import React from "react";
import s from "./../AddBook/addBook.module.css";
import { Field, reduxForm } from "redux-form";

let AddBook = (props) => {
  let getFormData = (values) => {
    props.addBook(values.category, values.author, values.title);
    props.closeModal();
  };

  return (
    <React.Fragment>
      {props.isOpen && (
        <div className={s.modal}>
          <div className={s.modalBody}>
            <AddNewBookForm onSubmit={getFormData} />
            <button onClick={props.closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const AddBookForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component="input" name="author" placeholder="Автор" />
        <Field component="input" name="title" placeholder="Название" />
        <Field component="input" name="category" placeholder="Категория" />
        <button>Добавить книгу</button>
      </div>
    </form>
  );
};

const AddNewBookForm = reduxForm({ form: "addNewBook" })(AddBookForm);

export default AddBook;
