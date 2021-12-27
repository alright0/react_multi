import React from "react";
import s from "./../Books.module.css";
import { Field, reduxForm } from "redux-form";
import { useMutation } from "@apollo/client";
import { addBookQuery, getBooksQuery } from "../../../api/queries/bookQueries";
import { required } from "../../../utils/reduxFormValidate";
import { customInput } from "../../../utils/reduxFormFields";

let AddBook = (props) => {
  const [addNewBook, { loading, error }] = useMutation(addBookQuery, {
    refetchQueries: [{ query: getBooksQuery }],
    onError(err) {
      return <span>{err.message}</span>;
    },
    onCompleted() {
      props.closeModal(true);
    },
  });

  let getFormData = (values) => {
    addNewBook({
      variables: { category: values.category, author: values.author, title: values.title },
    });

  };

  return (
    <React.Fragment>
      {props.isOpen && (
        <div className={s.modal}>
          <div className={s.modalBody}>
            {error && <span className={s.error}>{error.message}</span>}
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
        <div>
          <Field component={customInput} name="author" validate={[required]} placeholder="Автор" />
        </div>
        <div>
          <Field component="input" name="title" /* validate={[required]} */ placeholder="Название" />
        </div>
        <div>
          <Field component={customInput} name="category" validate={[required]} placeholder="Категория" />
        </div>
        <button>Добавить книгу</button>
      </div>
    </form>
  );
};

const AddNewBookForm = reduxForm({ form: "addBookForm" })(AddBookForm);

export default AddBook;
