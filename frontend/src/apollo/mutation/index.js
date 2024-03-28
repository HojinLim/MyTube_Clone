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

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $email: String!
    $locale: String!
    $profileImage: String
  ) {
    register(
      input: {
        username: $username
        password: $password
        email: $email
        locale: $locale
        profileImage: $profileImage
      }
    ) {
      jwt
      user {
        id
        username
        profileImage
        created_at
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        profileImage
        created_at
      }
    }
  }
`
export const UPLOAD_VIDEO = gql`
  mutation uploadVideo(
    $title: String!
    $description: String!
    $createdBy: String!
    $contents: ID!
    $thumbnail: ID!
    $isPublic: Boolean!
  ) {
    createYoutubeMedia(
      input: {
        data: {
          title: $title
          description: $description
          createdBy: $createdBy
          contents: $contents
          thumbnail: $thumbnail
          isPublic: $isPublic
        }
      }
    ) {
      youtubeMedia {
        id
        title
        contents {
          name
          url
          id
        }
        description
        createdBy
        isPublic
      }
    }
  }
`
// export const UPLOAD_VIDEO = gql`
//   mutation uploadVideo(
//     $title: String!
//     $description: String!
//     $createdBy: String!
//     $contents: String!
//   ) {
//     createYoutubeMedia(
//       input: {
//         title: $title
//         description: $description
//         createdBy: $createdBy
//         contents: $contents
//       }
//     ) {
//       id
//       title
//       description
//       createdBy
//     }
//   }
// `

// createYoutubeMedia(input:{data:{title:"test",description:"test is good",createdBy:"gg@abc.com",contents:"3"}}){
//   youtubeMedia{
//     id
//     title
//     contents{
//       name
//       url
//       id
//     }
//     description
//     createdBy
//   }
// }
// }
