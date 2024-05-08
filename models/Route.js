// models/Route.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const routeSchema = new Schema({
  path: { type: String, required: true },
  name: { type: String, required: true },
  component: { type: String, required: true },
  meta: {
    title: String,
    requiresAuth: Boolean
  }
}, { versionKey: false });

module.exports = mongoose.model('Route', routeSchema);
