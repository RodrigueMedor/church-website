import { gql } from '@apollo/client';

export const GET_NEWS = gql`
  query GetNews {
    contentsByType(type: NEWS) {
      id
      key
      title
      description
      body
      isActive
      imageUrl
      type
      createdAt
      updatedAt
      metadata
    }
  }
`;

export const CREATE_NEWS = gql`
  mutation CreateNews($input: ContentInput!) {
    createContent(input: $input) {
      id
      key
      title
      description
      body
      isActive
      imageUrl
      type
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation UpdateNews($id: ID!, $input: ContentInput!) {
    updateContent(id: $id, input: $input) {
      id
      key
      title
      description
      body
      isActive
      imageUrl
      type
      updatedAt
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation DeleteNews($id: ID!) {
    deleteContent(id: $id)
  }
`;
