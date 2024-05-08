// models/PersonalSpace.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PersonalSpacePageList = require('./PersonalSpacePageList')

const personalSpacePageListSchema = new Schema({
  id: { type: String },
  content: { type: Object },
  path: { type: String, required: true },
  pid: { type: String },
  meta: { type: Object },
  title: { type: String, required: true },
  type: { type: String, enum: ['page', 'module'], required: true }
}, { versionKey: false });

personalSpacePageListSchema.add({
  children: [personalSpacePageListSchema]
})

const personalSpaceSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  spaceName: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  staffNum: { type: Number, required: true },
  desc: { type: String, required: true },
  pageList: [personalSpacePageListSchema],
  expendRouterList: [{ type: Schema.Types.ObjectId, ref: 'Route' }],  // 假设已定义 RouteModel
  routeList: [{ type: Schema.Types.ObjectId, ref: 'Route' }]  // 假设已定义 RouteModel
}, { versionKey: false });

module.exports = mongoose.model('PersonalSpace', personalSpaceSchema);
