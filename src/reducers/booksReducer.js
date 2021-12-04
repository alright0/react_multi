import { bookApi } from "../api/rest/booksApi";

export const INIT_BOOKS = "INIT_BOOKS";
export const ADD_BOOK = "ADD_BOOK";

let initialState = {
  books: null,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BOOKS:
      return { ...state.books, ...action.books };
    case ADD_BOOK:
      return { ...state, ...action.books };
    default:
      return state;
  }
};

export const initBooks = (books) => {
  return { type: INIT_BOOKS, books: { books } };
};

export const getBooks = () => (dispatch) => {
  bookApi.getBooks().then((books) => {
    dispatch(initBooks(books));
  });
};

export const addBook = (category, author, title) => (dispatch) => {
  let data = { category, author, title };
  bookApi.addBook(data).then(() => {
    dispatch(getBooks());
  });
};

export const deleteBook = (id) => (dispatch) => {
  bookApi.deleteBook(id).then(() => {
    dispatch(getBooks());
  });
};

export default booksReducer;
