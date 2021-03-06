'use strict';

/**
 * Categorie.js controller
 *
 * @description: A set of functions called "actions" for managing `Categorie`.
 */

module.exports = {

  /**
   * Retrieve categorie records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.categorie.search(ctx.query);
    } else {
      return strapi.services.categorie.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a categorie record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.categorie.fetch(ctx.params);
  },

  /**
   * Count categorie records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.categorie.count(ctx.query);
  },

  /**
   * Create a/an categorie record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.categorie.add(ctx.request.body);
  },

  /**
   * Update a/an categorie record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.categorie.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an categorie record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.categorie.remove(ctx.params);
  }
};
