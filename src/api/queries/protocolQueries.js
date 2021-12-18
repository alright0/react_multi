import { gql } from "@apollo/client";

export const addProtocols = gql`
  query protocol {
    protocols {
      edges {
        node {
          id
          title
          created
        }
      }
    }
  }
`;

export const getProtocol = gql`
  query getProtocol($id: ID!) {
    protocol(id: $id) {
      id
      type
      title
      created
      screenSet {
        edges {
          node {
            id
            type
            title
            key
          }
        }
      }
    }
  }
`;

export const getProtocol = gql`
  mutation addScreen($title: String!, $type: String!, $description: String!, $parent: String!, $key: Float!) {
    createScreen(title: $title, type: $type, description: $description, parent: $parent, key: $key) {
      screen {
        type
        title
        description
        parent
        key
        created
      }
    }
  }
`;
