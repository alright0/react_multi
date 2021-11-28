import { React } from "react";

let AddBook = (props) => {
  let getFormData = (e) => {
    e.preventDefault();
    let data = {
      category: e.target.elements.author.value,
      author: e.target.elements.title.value,
      title: e.target.elements.category.value,
    };
    props.addBook(data);

    e.target.elements.author.value = "";
    e.target.elements.title.value = "";
    e.target.elements.category.value = "";
  };

  return (
    <div>
      <form onSubmit={getFormData}>
        <div>
          <label htmlFor="author">Автор</label>
          <input type="text" name="author" />
        </div>
        <div>
          <label htmlFor="title">Название</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="category">Категория</label>
          <input type="text" id="category" name="category" />
        </div>
        <div>
          <button type="submit">Добавить книгу</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
