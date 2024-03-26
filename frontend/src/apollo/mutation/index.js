import { gql } from "@apollo/client"

export const CREATE_TEST = gql`
  mutation createTest($test1: String) {
    createTest(input: { data: { test1: $test1 } }) {
      test {
        id
        test1
      }
    }
  }
`
export const UPDATE_TEST = gql`
  mutation updateTest($test1: String, $id: ID!) {
    updateTest(input: { data: { test1: $test1 }, where: { id: $id } }) {
      test {
        id
        test1
      }
    }
  }
`
export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $profileImage: String!
  ) {
    createUser(
      input: {
        data: {
          username: $username
          email: $email
          password: $password
          profileImage: $profileImage
        }
      }
    ) {
      user {
        id
        username
        profileImage
        created_at
      }
    }
  }
`
// export const createUser = gql`
//   mutation createUser($username: String!, $email: String!, $password: String!) {
//     createUser(input: { data: { username: $username, password: $password, email: $email } }) {
//       user {
//         id
//         username
//         created_at
//       }
//     }
//   }
// `
