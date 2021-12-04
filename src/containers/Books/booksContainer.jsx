import Books from "../../components/Books/Books";
import { connect } from "react-redux";
import { addBook, getBooks, deleteBook } from "./../../reducers/booksReducer";

let mapStateToProps = (state) => {
  return {
    books: state.books.books,
  };
};

export default connect(mapStateToProps, { getBooks, addBook, deleteBook })(Books);
