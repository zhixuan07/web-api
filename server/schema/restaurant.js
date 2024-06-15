const moogose = require('mongoose');

const restaurantSchema = new moogose.Schema({
    uuid: { type: String, required: true },
    location_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String},
    rating: { type: String},
    num_reviews: { type: String,},
    image_url: { type: String},
    phone: { type: String},
    website: { type: String},

})

const Restaurant = moogose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;