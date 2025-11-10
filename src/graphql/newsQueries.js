import { gql } from '@apollo/client';

export const GET_NEWS = gql`
  query GetNews {
    contentsByType(type: NEWS) {
      id
      key
      title
      description
      body
      imageUrl
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_SINGLE_NEWS = gql`
  query GetNewsItem($key: String!) {
    content(key: $key) {
      id
      key
      title
      description
      body
      imageUrl
      isActive
      metadata
      createdAt
      updatedAt
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
      imageUrl
      isActive
      createdAt
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation UpdateNews($key: String!, $input: ContentInput!) {
    updateContent(key: $key, input: $input) {
      id
      key
      title
      description
      body
      imageUrl
      isActive
      updatedAt
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation DeleteNews($key: String!) {
    deleteContent(key: $key) {
      id
      title
    }
  }
`;
