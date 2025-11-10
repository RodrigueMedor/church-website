import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Your GraphQL endpoint
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

// Content Operations
export const contentQueries = {
  GET_CONTENT: `
    query GetContent($key: String!) {
      content(key: $key) {
        id
        key
        title
        description
        body
        imageUrl
        order
        isActive
        type
        metadata
      }
    }
  `,
  GET_CONTENTS_BY_TYPE: `
    query GetContentsByType($type: ContentType!) {
      contentsByType(type: $type) {
        id
        key
        title
        description
        isActive
        order
        type
      }
    }
  `,
  CREATE_CONTENT: `
    mutation CreateContent($input: ContentInput!) {
      createContent(input: $input) {
        id
        key
        title
        description
        body
        type
        isActive
      }
    }
  `,
  UPDATE_CONTENT: `
    mutation UpdateContent($key: String!, $input: ContentInput!) {
      updateContent(key: $key, input: $input) {
        id
        key
        title
        description
        body
        type
        isActive
      }
    }
  `,
  DELETE_CONTENT: `
    mutation DeleteContent($key: String!) {
      deleteContent(key: $key) {
        id
        key
        title
      }
    }
  `
};

export const authMutations = {
  LOGIN: `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
        user {
          id
          email
          name
          role
        }
      }
    }
  `,
  SIGNUP: `
    mutation SignUp($input: UserInput!) {
      signUp(input: $input) {
        token
        user {
          id
          email
          name
          role
        }
      }
    }
  `
};
