
// models/PersonalSpacePageList.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalSpacePageListSchema = new Schema({
  id: { type: String },
  content: { type: String },
  path: { type: String, required: true },
  pid: { type: String },
  meta: { type: Object },
  title: { type: String, required: true },
  type: { type: String, enum: ['page', 'module'], required: true }
}, { versionKey: false });

personalSpacePageListSchema.add({
  children: [personalSpacePageListSchema]
})

module.exports = mongoose.model('PersonalSpacePageList', personalSpacePageListSchema);
