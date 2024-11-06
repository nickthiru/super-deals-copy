/**
 * Index file for the shared package (CommonJS).
 */
const { capitalize } = require('./lib/src/capitalize.cjs');
const { getDealSchema, jsonSchema } = require("./lib/schemas/deal.schema.cjs");
module.exports = { capitalize, getDealSchema, jsonSchema };