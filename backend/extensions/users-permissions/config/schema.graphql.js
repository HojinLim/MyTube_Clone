const _ = require("lodash");
module.exports = {
  type: {
    UsersPermissionsPermission: false, // Make this type NOT queriable.
  },
  definition: /* GraphQL */ `
    type UsersPermissionsMe {
      id: ID!
      username: String!
      email: String!
      name: String
      sub: String!
      locale: String!
      role: UsersPermissionsMeRole
      blocked: Boolean
      profileImage: String
      created_at: DateTime!
    }
    input UsersPermissionsRegisterInput {
      username: String!
      email: String!
      password: String!

      locale: String!
      profileImage: String
      role: ID
    }
    input UsersPermissionsPasswordInput {
      password: String!
    }
  `,
  query: ``,
  mutation: ``,
  resolver: {
    Query: {},
    Mutation: {},
  },
};
