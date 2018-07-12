'use strict';

/**
 * Playerid.js controller
 *
 * @description: A set of functions called "actions" for managing `Playerid`.
 */

module.exports = {

  /**
   * Retrieve playerid records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.playerid.search(ctx.query);
    } else {
      return strapi.services.playerid.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a playerid record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.playerid.fetch(ctx.params);
  },

  /**
   * Count playerid records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.playerid.count(ctx.query);
  },

  /**
   * Create a/an playerid record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.playerid.add(ctx.request.body);
  },

  /**
   * Update a/an playerid record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.playerid.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an playerid record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.playerid.remove(ctx.params);
  }
};
