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
    }
  }
`

export const GET_ALL_VIDEOS = gql`
  query AllYoutubeMedia {
    youtubeMedias {
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
      users_permissions_users {
        id
        profileImage
        username
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
      users_permissions_users {
        id
        profileImage
        username
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
export const GET_LIKES_BY_UID = gql`
  query findLikedByUID($uid: String) {
    likeds(where: { uid: $uid }) {
      id
      youtube_medias {
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
  }
`

export const GET_LATER_BY_UID = gql`
  query findLaterByUID($uid: String) {
    laters(where: { uid: $uid }) {
      id
      youtube_medias {
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
  }
`
