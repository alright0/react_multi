import { gql } from "@apollo/client";

export const ADD_BOOK_QUERY = () => {
  gql`
    mutation addBook($author: String!, $title: String!, $category: String!) {
      createBook(author: $author, title: $title, category: $category) {
        book {
          title
          author
          category
        }
      }
    }
  `;
};
