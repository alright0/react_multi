import { gql } from "@apollo/client";

export const addProtocols = gql`
  query protocol {
    protocols {
      edges {
        node {
          id
          title
          created
          type
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
            description
            image
            key
            created
          }
        }
      }
    }
  }
`;

export const addProtocol = gql`
  mutation addProtocol($title: String!, $type: String!) {
    createProtocol(title: $title, type: $type) {
      protocol {
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
              description
              parent
              key
              created
            }
          }
        }
      }
    }
  }
`;

export const deleteProtocol = gql`
  mutation deleteProtocol($id: ID!) {
    deleteProtocol(id: $id) {
      protocol {
        id
        type
        title
        created
      }
    }
  }
`;

export const updateProtocol = gql`
  mutation updateProtocol($id: ID!, $title: String!, $type: String!) {
    updateProtocol(id: $id, title: $title, type: $type) {
      protocol {
        id
        type
        title
        created
      }
    }
  }
`;

export const addScreen = gql`
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

export const deleteScreen = gql`
  mutation deleteScreen($id: ID!) {
    deleteScreen(id: $id) {
      screen {
        key
      }
    }
  }
`;

export const updateScreen = gql`
  mutation updateScreen($id: ID!, $title: String!, $type: String!, $description: String!, $key: Float!) {
    updateScreen(id: $id, title: $title, type: $type, description: $description, key: $key) {
      screen {
        id
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

export const uplodateImage = gql`
  mutation uploadImage($image: Upload!, $parent: String!, $description: String!, $key: Float!) {
    uploadImage(image: $image, parent: $parent, description: $description, key: $key) {
      screen {
        id
        type
        description
        image
      }
    }
  }
`;
