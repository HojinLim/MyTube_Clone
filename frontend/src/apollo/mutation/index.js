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
    $duration: String!
    $user_id: [ID]
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
          duration: $duration
          users_permissions_users: $user_id
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
        duration
        users_permissions_users {
          id
        }
      }
    }
  }
`

export const DELETE_VIDEO = gql`
  mutation DELETE_VIDEO($id: ID!) {
    deleteYoutubeMedia(input: { where: { id: $id } }) {
      youtubeMedia {
        id
        title
      }
    }
  }
`
export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { where: { id: $id } }) {
      comment {
        id
        contents
      }
    }
  }
`

// 댓글 작성
export const CREATE_COMMENT = gql`
  mutation createComment(
    $subId: String
    $username: String
    $contents: String
    $profileImage: String
  ) {
    createComment(
      input: {
        data: {
          subId: $subId
          username: $username
          contents: $contents
          profileImage: $profileImage
        }
      }
    ) {
      comment {
        id
        username
        profileImage
        subId
        created_at
      }
    }
  }
`

// 나중에 볼 영상

export const CREATE_LATER = gql`
  mutation createLater($uid: String, $youtube_id: [ID]) {
    createLater(input: { data: { uid: $uid, youtube_medias: $youtube_id } }) {
      later {
        id
        uid
        youtube_medias {
          title
          description
        }
      }
    }
  }
`
export const UPDATE_LATER = gql`
  mutation updateLaterVideo($id: ID!, $uid: String, $youtube_id: [ID]) {
    updateLater(input: { where: { id: $id }, data: { uid: $uid, youtube_medias: $youtube_id } }) {
      later {
        id
        youtube_medias {
          id
          title
          description
        }
      }
    }
  }
`
