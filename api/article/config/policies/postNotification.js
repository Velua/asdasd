module.exports = async (ctx, next) => {
  // Indicate to the server to go to
  // the next policy or to the controller's action.
  await next();

  // The code below will be executed after the controller's action.
  if (ctx.body.pushNotification) {

    // Get Author of Article and fetch Author obj
    const authorId = ctx.body.author._id;
    const authorObj = await strapi.services.author.fetch({ author: authorId })
    
    // Find authors subscriber ids
    const subscriberIds = authorObj.subscribers.map(subscriberObj => subscriberObj._id)
    console.log('hi', subscriberIds)

    // For every subscriber id, find their player Ids and form into one payload
    const promises = subscriberIds.map(subscriberId => strapi.services.playerid.fetchAll({ user: subscriberId }));

    const loadedPlayerIds = await Promise.all(promises);
    const flattendPlayerIds = [].concat(...loadedPlayerIds);
    const playerIdArray = flattendPlayerIds.map(obj => obj.playerIdString)

    console.log(playerIdArray)

    
  }
};
