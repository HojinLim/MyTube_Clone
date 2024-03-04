'use strict';

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const _ = require('lodash');
const adminUserController = require('./user/admin');
const apiUserController = require('./user/api');
const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

const resolveController = ctx => {
  const {
    state: { isAuthenticatedAdmin },
  } = ctx;

  return isAuthenticatedAdmin ? adminUserController : apiUserController;
};

const resolveControllerMethod = method => ctx => {
  const controller = resolveController(ctx);
  const callbackFn = controller[method];

  if (!_.isFunction(callbackFn)) {
    return ctx.notFound();
  }

  return callbackFn(ctx);
};

module.exports = {
  create: resolveControllerMethod('create'),
  update: resolveControllerMethod('update'),

  /**
   * Retrieve user records.
   * @return {Object|Array}
   */
  async find(ctx, next, { populate } = {}) {
    let users;

    if (_.has(ctx.query, '_q')) {
      // use core strapi query to search for users
      users = await strapi.query('user', 'users-permissions').search(ctx.query, populate);
    } else {
      users = await strapi.plugins['users-permissions'].services.user.fetchAll(ctx.query, populate);
    }

    ctx.body = users.map(sanitizeUser);
  },

  /**
   * Retrieve a user record.
   * @return {Object}
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    let data = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    if (data) {
      data = sanitizeUser(data);
    }

    // Send 200 `ok`
    ctx.body = data;
  },

  /**
   * Retrieve user count.
   * @return {Number}
   */
  async count(ctx) {
    if (ctx.query._q) {
      return await strapi.plugins['users-permissions'].services.user.countSearch(ctx.query);
    }
    ctx.body = await strapi.plugins['users-permissions'].services.user.count(ctx.query);
  },

  /**
   * Destroy a/an user record.
   * @return {Object}
   */
  async destroy(ctx) {
    const { id } = ctx.params;
    const data = await strapi.plugins['users-permissions'].services.user.remove({ id });
    ctx.send(sanitizeUser(data));
  },

  async destroyAll(ctx) {
    const {
      request: { query },
    } = ctx;

    const toRemove = Object.values(_.omit(query, 'source'));
    const { primaryKey } = strapi.query('user', 'users-permissions');
    const finalQuery = { [`${primaryKey}_in`]: toRemove, _limit: 100 };

    const data = await strapi.plugins['users-permissions'].services.user.removeAll(finalQuery);

    ctx.send(data);
  },

  /**
   * Retrieve authenticated user.
   * @return {Object|Array}
   */
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }
    let data = await strapi.plugins['users-permissions'].services.user.fetch({
      id: user.id
    });
    const dataset = sanitizeUser(data);
    ctx.body = dataset;
  },

  // 비밀번호 재설정
  async updatePassword(ctx) {
    const params = ctx.request.body.input
    const user = await strapi.query('user', 'users-permissions').findOne({ email: params.email })
    
    const authCodeCheck = await strapi.query('send-email').findOne({ useremail: user.email, _sort: 'id:desc' },)
    const password = await strapi.plugins['users-permissions'].services.user.hashPassword({
      password: params.password,
    });

    // 받은 authCode 체크
    if (authCodeCheck.authcode === params.authcode) {
      // Update the user.
      await strapi
        .query('user', 'users-permissions')
        .update({ id: user.id }, { resetPasswordToken: null, password: password, try: 0 })
      return ctx.body = user
    } else {
      return ctx.throw(401, 'wrong authCode')
    }
  },

  // 아이디 차단 해제
  async unlockUser(ctx) {
    const params = ctx.request.body.input
    const user = await strapi.query('user', 'users-permissions').findOne({ email: params.email })

    const authCodeCheck = await strapi.query('send-email').findOne({ useremail: params.email, _sort: 'id:desc' },)

    if (authCodeCheck.authcode === params.authcode) {
      await strapi
        .query('user', 'users-permissions')
        .update({ id: user.id }, { blocked: false, try: 0 })
      ctx.send({ message: 'The user is unlocked' })
    } else {
      return ctx.throw(401, 'wrong authCode')
    }
  },
}
