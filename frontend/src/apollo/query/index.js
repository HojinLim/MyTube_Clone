import { gql } from "@apollo/client"

export const tests = gql`
  query tests($test1: String) {
    tests(where: { test1_ne: $test1 }) {
      id
      test1
    }
  }
`
export const FIND_USER_BY_EMAIL = gql`
  query findUserByEmail($email: String) {
    users(where: { email: $email }) {
      id
      email
      username
      profileImage
    }
  }
`
// export const findUser = gql`
//   query findUser($email: String) {
//     findUser(where: { email_ne: $email }) {
//       id
//       test1
//     }
//   }
// `
