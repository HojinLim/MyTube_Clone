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
        like_users {
          id
        }
        duration
        created_at
        sort
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
      created_youtubes {
        id
        title
        views
      }
    }
  }
`
export const FIND_USERS_ID_BY_SORT = gql`
  query YoutubeMediaById($sort: String!) {
    youtubeMedias(where: { sort: $sort }) {
      id
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
      like_users {
        id
      }
      dislike_users {
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
    youtubeMedia(id: $id) {
      id
      description
      title
      isPublic
      views
      created_at
      duration
      like_users {
        id
      }
      dislike_users {
        id
      }
      later_users {
        id
      }
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
export const GET_ALL_SHORTS = gql`
  query GET_ALL_SHORTS($sort: String) {
    youtubeMedias(where: { sort: $sort }) {
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
      like_users {
        id
      }
      dislike_users {
        id
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
      later_users {
        id
      }
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
  query GetComments($id: ID!) {
    comments(where: { created_youtube: $id }) {
      id
      contents
      isParent
      like_users {
        id
      }
      dislike_users {
        id
      }
      created_user {
        id
        profileImage
        username
      }
      created_at
      replies {
        id
        contents
        created_at
        isParent

        like_users {
          id
        }
        dislike_users {
          id
        }

        root_comment {
          id
          replies {
            id
          }
        }
        created_user {
          id
          profileImage
          username
        }
      }
    }
  }
`

export const GET_COMMENTS_BY_ID_COMMUNITY = gql`
  query GetComments($id: ID!) {
    comments(where: { created_community: $id }) {
      id
      contents

      like_users {
        id
      }
      dislike_users {
        id
      }
      created_user {
        id
        profileImage
        username
      }
      created_at
    }
  }
`

// 좋아요 영상
// *READ*
export const GET_LIKES_BY_UID = gql`
  query findLikedByUID($id: String!) {
    youtubeMedias(where: { like_users: { id: $id } }) {
      id
      like_users {
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
export const GET_SEARCH_VIDEOS = gql`
  query GET_SEARCH_VIDEOS($title: String) {
    youtubeMedias(where: { title_contains: $title }) {
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
      created_user {
        id
        profileImage
        username
      }
    }
  }
`
export const GET_ALL_COMMUNITIES = gql`
  query AllCommunities($id: ID) {
    communities(where: { created_user: $id }) {
      id
      contents
      created_at
      created_user {
        id
        username
        profileImage
      }
      like_users {
        id
      }
      dislike_users {
        id
      }
      photo {
        id
        url
      }
      comments {
        id
      }
    }
  }
`
export const GET_COMMUNITY_BY_ID = gql`
  query getCommunityById($id: ID!) {
    community(id: $id) {
      id
      contents
      created_at
      created_user {
        id
        username
        profileImage
      }
      like_users {
        id
      }
      dislike_users {
        id
      }
      photo {
        id
        url
      }
      comments {
        id
      }
    }
  }
`
