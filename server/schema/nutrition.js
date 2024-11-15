const moogoos = require('mongoose');

const nutritionSchema = new moogoos.Schema({
    uuid : { type: String, required: true },
    foods:{type:Array, required:true}
});

const Nutrition = moogoos.model('Nutrition', nutritionSchema);
module.exports = Nutrition;