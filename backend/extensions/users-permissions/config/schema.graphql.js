const _ = require('lodash');
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
      role: UsersPermissionsMeRole
      blocked: Boolean
    }
    input UsersPermissionsRegisterInput {
      username: String!
      email: String!
      password: String!
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
    Mutation: {}
  },
};
