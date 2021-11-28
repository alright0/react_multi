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

export const addBook = (data) => (dispatch) => {
  bookApi.addBook(data).then(() => {
    dispatch(getBooks());
  });
};

export default booksReducer;
