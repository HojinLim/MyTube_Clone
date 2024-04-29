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
    $created_user: ID
    $sort: ENUM_YOUTUBEMEDIA_SORT!
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
          created_user: $created_user
          sort: $sort
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
        sort
        created_user {
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
    $contents: String
    $isParent: Boolean
    $created_user: ID
    $created_youtube: ID
    $ownerId: String
  ) {
    createComment(
      input: {
        data: {
          contents: $contents
          isParent: $isParent
          created_user: $created_user
          created_youtube: $created_youtube
          ownerId: $ownerId
        }
      }
    ) {
      comment {
        id
        contents
        created_at
        isParent
        created_user {
          id
          username
          profileImage
        }
        created_youtube {
          id
        }
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
  mutation updateLater($id: ID!, $later_users: [ID]) {
    updateYoutubeMedia(input: { where: { id: $id }, data: { later_users: $later_users } }) {
      youtubeMedia {
        id
        later_users {
          id
        }
      }
    }
  }
`
export const UPDATE_LIKE = gql`
  mutation updateLike($id: ID!, $like_users: [ID]) {
    updateYoutubeMedia(input: { where: { id: $id }, data: { like_users: $like_users } }) {
      youtubeMedia {
        id
        like_users {
          id
        }
      }
    }
  }
`
export const UPDATE_DISLIKE = gql`
  mutation updateDislike($id: ID!, $dislike_users: [ID]) {
    updateYoutubeMedia(input: { where: { id: $id }, data: { dislike_users: $dislike_users } }) {
      youtubeMedia {
        id
        dislike_users {
          id
        }
      }
    }
  }
`
export const UPDATE_COMMENT_LIKE = gql`
  mutation updateLike($id: ID!, $like_users: [ID]) {
    updateComment(input: { where: { id: $id }, data: { like_users: $like_users } }) {
      comment {
        id
        like_users {
          id
        }
      }
    }
  }
`
export const UPDATE_COMMENT_DISLIKE = gql`
  mutation updateDislike($id: ID!, $dislike_users: [ID]) {
    updateComment(input: { where: { id: $id }, data: { dislike_users: $dislike_users } }) {
      comment {
        id
        dislike_users {
          id
        }
      }
    }
  }
`
export const UPDATE_COMMUNITY_LIKE = gql`
  mutation updateLike($id: ID!, $like_users: [ID]) {
    updateCommunity(input: { where: { id: $id }, data: { like_users: $like_users } }) {
      community {
        id
        like_users {
          id
        }
      }
    }
  }
`
export const UPDATE_COMMUNITY_DISLIKE = gql`
  mutation updateDislike($id: ID!, $dislike_users: [ID]) {
    updateCommunity(input: { where: { id: $id }, data: { dislike_users: $dislike_users } }) {
      community {
        id
        dislike_users {
          id
        }
      }
    }
  }
`
export const UPDATE_SUB = gql`
  mutation updateUser($id: ID!, $user_id: [ID]!) {
    updateUser(input: { where: { id: $id }, data: { sub_users: $user_id } }) {
      user {
        sub_users {
          id
        }
      }
    }
  }
`
export const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $contents: String) {
    updateComment(input: { where: { id: $id }, data: { contents: $contents } }) {
      comment {
        id
        contents
      }
    }
  }
`
export const UPDATE_COMMENTS = gql`
  mutation updateComment($id: ID!, $replies: [ID]) {
    updateComment(input: { where: { id: $id }, data: { replies: $replies } }) {
      comment {
        id
        contents
        created_at
      }
    }
  }
`
export const UPDATE_ISPUBLIC = gql`
  mutation updateIsPublic($id: ID!, $isPublic: Boolean!) {
    updateYoutubeMedia(input: { where: { id: $id }, data: { isPublic: $isPublic } }) {
      youtubeMedia {
        id
        isPublic
      }
    }
  }
`
export const INCREMENT_VIEWS = gql`
  mutation IncrementViews($id: ID!, $views: Int) {
    updateYoutubeMedia(input: { where: { id: $id }, data: { views: $views } }) {
      youtubeMedia {
        views
      }
    }
  }
`
export const CREATE_POST = gql`
  mutation createCommunity($created_user: ID, $contents: String, $photo: [ID]) {
    createCommunity(
      input: { data: { contents: $contents, photo: $photo, created_user: $created_user } }
    ) {
      community {
        id
        contents
        photo {
          id
          url
        }
      }
    }
  }
`
