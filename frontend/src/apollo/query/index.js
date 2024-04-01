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
    }
  }
`
export const GET_VIDEO_BY_ID = gql`
  query YoutubeMediaById($id: ID!) {
    youtubeMedia(id: $id) {
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
    }
  }
`
