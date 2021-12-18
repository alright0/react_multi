import { gql } from "@apollo/client";

export const addBookQuery = gql`
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

export const deleteBookQuery = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      book {
        title
        author
        category
      }
    }
  }
`;

export const getBooksQuery = gql`
  query getBooks {
    books {
      edges {
        node {
          id
          title
          author
          category
        }
      }
    }
  }
`;
