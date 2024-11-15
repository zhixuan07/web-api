const moogose = require('mongoose');

const recipeSchema = new moogose.Schema({
    uuid: { type: String, required: true },
    idMeal: { type: String, required: true },
    strMeal: { type: String, required: true },
    strCategory: { type: String, required: true },
    strInstructions: { type: String, required: true },
    strMealThumb: { type: String, required: true },
    strIngredients : { type: Object, required: true },
    

})

const Recipe = moogose.model('Recipe', recipeSchema);
module.exports = Recipe;
