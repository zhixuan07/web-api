const moogose = require('mongoose');

const restaurantSchema = new moogose.Schema({
    location_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: String, required: true },
    num_reviews: { type: String, required: true },
    image_url: { type: String, required: true },

})

const Restaurant = moogose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;