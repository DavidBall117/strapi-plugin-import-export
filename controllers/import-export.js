"use strict";

// parseMultipartData: This function parses Strapi's formData format.
// sanitizeEntity: This function removes all private fields from the model and its relations.
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

const dbProperties = [
  "id",
  "published_at",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
];

const clean = (obj) => {
  if (obj instanceof Array) {
    obj.forEach((item) => {
      clean(item);
    });
  } else if (obj !== null && typeof obj === "object") {
    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (dbProperties.indexOf(key) !== -1) delete obj[key];
      else clean(obj[key]);
    });
  }
};

module.exports = {
  index: async (ctx) => {
    ctx.send({
      message: "ok",
    });
  },

  getRawData: async (ctx) => {
    // if no source given as a query parameter, return nothing
    if (!ctx.query.source) return ctx.send(null);
    // if source is all, fetch all data, else fetch source data
    let data = [];
    if (ctx.query.source.toLocaleLowerCase() === "all") {
      const keys = Object.keys(strapi.services);
      for (let i = 0; i < keys.length; i++) {
        const res = await strapi.services[keys[i]].find();
        data.push({
          key: keys[i],
          value: res,
        });
      }
    } else {
      const value = await strapi.services[ctx.query.source].find();
      data.push({
        key: ctx.query.source,
        value,
      });
    }
    // clean db properties from data and return
    clean(data);
    return ctx.send(
      data.length > 0
        ? data
        : { errorMessage: "No data. Did you remember to publish?" }
    );
  },

  postRawData: async (ctx) => {
    // upload value(s) based on key, if key exists in strapi services
    let success = true;
    const data = ctx.request.body;
    try {
      for (let i = 0; i < data.length; i++) {
        const key = data[i].key;
        const value = data[i].value;
        // If the type is null then continue.
        const info = strapi.services.hasOwnProperty(key)
          ? await strapi.services[key].find()
          : null;
        if (info === null) continue;
        // Collection Type
        if (
          strapi.services.hasOwnProperty(key) &&
          strapi.services[key].create
        ) {
          if (value instanceof Array) {
            for (const v of value) {
              await strapi.services[key].create(v);
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
    // return whether or not upload was successful
    return ctx.send({
      success,
    });
  },
};
