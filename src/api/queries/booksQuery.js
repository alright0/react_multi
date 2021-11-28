import { gql } from "@apollo/client";

const booksQuery = gql`
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

export default booksQuery;
