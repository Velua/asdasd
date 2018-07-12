"use strict";

function cleanArticles(articles) {
  return articles.map(
    ({ categories, _id, title, content, createdAt, updatedAt, author }) => ({
      categories:
        categories.length > 0
          ? categories.map(({ _id, title }) => ({ _id, title }))
          : [],
      _id,
      content,
      createdAt,
      updatedAt,
      author: {
        name: author.name,
        _id: author._id
      }
    })
  );
}

/**
 * Article.js controller
 *
 * @description: A set of functions called "actions" for managing `Article`.
 */

module.exports = {
  /**
   * Retrieve article records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    console.log(ctx.state.user.role.name);

    switch (ctx.state.user.role.name) {
      case "Author":
        return strapi.services.article.fetchAll({
          author: ctx.state.user.author._id
        });
      case "Authenticated":
        // Get subscribed articles
        const subscriptions = ctx.state.user.subscriptions.map(authorObj => authorObj._id);
        const promises = subscriptions.map(authorId => strapi.services.article.fetchAll({ author: authorId, free: false }));
        const loadedArticles = await Promise.all(promises);
        console.log('Loaded articles', loadedArticles)
        const flattenedArticles = [].concat(...loadedArticles);

        // Get free articles
        const freeArticles = await strapi.services.article.fetchAll({
          free: true
        });

        // return an array of free articles and the flattened
        return cleanArticles([...freeArticles, ...flattenedArticles]);
      case "Administrator":
        return strapi.services.article.fetchAll(ctx.query);
    }

    return strapi.services.article.fetchAll(ctx.query);
  },

  /**
   * Retrieve a article record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.article.fetch(ctx.params);
  },

  /**
   * Count article records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.article.count(ctx.query);
  },

  /**
   * Create a/an article record.
   *
   * @return {Object}
   */

  create: async ctx => {
    console.log(ctx.state.user.role.name);
    if (ctx.state.user.role.name !== 'Author' && ctx.state.user.role.name !== 'Administrator') {
      return 'You do not have permission to create a post as your account is not an administrator nor author.'
    }


    return strapi.services.article.add(ctx.request.body);
  },

  /**
   * Update a/an article record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.article.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an article record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.article.remove(ctx.params);
  }
};
