'use strict';

module.exports = {
  getRawData: async (ctx) => {
    const responseData = [];
    // If source is all, fetch all data, else fetch specific source data.
    if (ctx.query.source && ctx.query.source.toLocaleLowerCase() === 'all') {
      const keys = Object.keys(strapi.services);
      for (let i = 0; i < keys.length; i++) {
        const res = await strapi.services[keys[i]].find();
        responseData.push({
          key: keys[i],
          value: res,
        });
      }
    } else if (ctx.query.source) {
      const value = await strapi.services[ctx.query.source].find();
      responseData.push({
        key: ctx.query.source,
        value,
      });
    }
    return ctx.send(responseData);
  },

  postRawData: async (ctx) => {
    // Upload value(s) based on key, if key exists in strapi services.
    let success = true;
    const data = ctx.request.body;
    try {
      for (let i = 0; data && Array.isArray(data) && i < data.length; i++) {
        const key = data[i].key;
        const value = data[i].value;
        // If the type is null then continue.
        const info = strapi.services.hasOwnProperty(key)
          ? await strapi.services[key].find()
          : null;
        if (info === null) {
          continue;
        }
        // Collection Type
        if (
          strapi.services.hasOwnProperty(key) &&
          strapi.services[key].create
        ) {
          if (Array.isArray(value)) {
            for (const item of value) {
              await strapi.services[key].create(item);
            }
          } else {
            await strapi.services[key].create(value);
          }
        }
        // Single Type
        else if (
          strapi.services.hasOwnProperty(key) &&
          strapi.services[key].createOrUpdate
        ) {
          await strapi.services[key].createOrUpdate(value);
        }
      }
    } catch (err) {
      console.log(err);
      success = false;
    }
    // Return whether or not upload was successful.
    return ctx.send({
      success,
    });
  },
};
