const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a Schema
const eventSchema = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true
  },
  description: String
});

// middleWare -------------------
// making sure slug is made from name
eventSchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});

// create the model
const eventModel = mongoose.model('Event', eventSchema);

// expor the model
module.exports = eventModel;

// slugifyu function
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
