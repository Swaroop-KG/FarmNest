const mongoose = require('mongoose');
const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);
const { commentSchema } = require('./comment');

const milletItemSchema = new mongoose.Schema({
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['vegetable', 'fruit', 'plant'], // ✅ Enforcing valid categories
    required: true
  },
  listedAt: {
    type: Date,
    default: () => new Date()
  },
  comments: [commentSchema]
});

const MilletItem = mongoose.model('MilletItem', milletItemSchema);

function validateMilletItem(item) {
  const schema = Joi.object({
    listedBy: JoiObjectId().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required(),
    category: Joi.string().valid('vegetable', 'fruit', 'plant').required(), // ✅ Validate category
    comments: Joi.array()
  });

  return schema.validate(item);
}

exports.MilletItem = MilletItem;
exports.validateMilletItem = validateMilletItem;
exports.milletItemSchema = milletItemSchema;
