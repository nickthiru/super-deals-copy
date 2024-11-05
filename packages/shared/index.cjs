const { capitalize } = require('./src/utils/capitalize.cjs');
const { getDealSchema, jsonSchema } = require("./schemas/deal.schema.cjs");

module.exports = { capitalize, getDealSchema, jsonSchema };