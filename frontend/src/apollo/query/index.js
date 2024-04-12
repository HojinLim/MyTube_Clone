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
export const FIND_USER_ID_BY_NAME = gql`
  query user($username: String) {
    users(where: { username: $username }) {
      id
      username
      profileImage
      created_youtubes {
        id
        title
        views
        duration
        created_at
        contents {
          url
        }
        thumbnail {
          url
        }
      }
    }
  }
`
export const FIND_USER_ID_BY_ID = gql`
  query findUser($id: ID) {
    users(where: { id: $id }) {
      id
      username
      sub_users {
        id
        username
        profileImage
      }
    }
  }
`

export const GET_ALL_VIDEOS = gql`
  query AllYoutube($id: ID) {
    youtubeMedias(where: { id: $id }) {
      id
      description
      title
      isPublic
      createdBy
      created_at
      duration
      sort
      views
      contents {
        url
      }
      thumbnail {
        url
      }

      later_users {
        id
      }
      like_user {
        id
      }
      dislike_user {
        id
      }
      created_user {
        id
        profileImage
      }
    }
  }
`
export const GET_VIDEO_BY_ID = gql`
  query YoutubeMediaById($id: ID!) {
    youtubeMedias(id: $id) {
      id
      description
      title
      isPublic
      views
      thumbnail {
        url
      }
      contents {
        url
      }
      created_user {
        id
        profileImage
        username
      }
    }
  }
`
export const GET_LATER_VIDEO_BY_ID = gql`
  query YoutubeMediaById($id: ID!) {
    youtubeMedias(where: { later_users: { id: $id } }) {
      id
      description
      title
      isPublic
      views
      createdBy
      created_at
      duration
      thumbnail {
        url
      }
      contents {
        url
      }
    }
  }
`
export const GET_COMMENTS_BY_ID = gql`
  query GetComments($subId: String) {
    comments(where: { subId: $subId }) {
      id
      subId
      username
      contents
      profileImage
      created_at
    }
  }
`

// 좋아요 영상
// *READ*
export const GET_LIKES_BY_UID = gql`
  query findLikedByUID($id: String!) {
    youtubeMedias(where: { like_user: { id: $id } }) {
      id
      like_user {
        id
      }
      id
      title
      createdBy
      created_at
      views
      duration
      thumbnail {
        url
      }
    }
  }
`
