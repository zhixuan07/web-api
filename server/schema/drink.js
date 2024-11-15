const moogose = require('mongoose');

const drinkSchema = new moogose.Schema({
    uuid: { type: String, required: true },
    idDrink: { type: String, required: true },
    strDrink: { type: String, required: true },
    strCategory: { type: String, required: true },
    strInstructions: { type: String, required: true },
    strDrinkThumb: { type: String, required: true },
    strIngredients : { type: Object, required: true },

})

const Drink = moogose.model('Drink', drinkSchema);
module.exports = Drink;
