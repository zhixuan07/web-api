const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3004;
const connectDB = require('../dbconn')
const Recipe = require('../schema/recipe');
// Use the CORS middleware
app.use(cors());

app.use(express.json());


// API endpoint to get the latest recipes
app.get('/api/latest_recipes', async (req, res) => {
  try{
    const response = await axios.get('https://themealdb.p.rapidapi.com/latest.php', {
      headers: {
        'x-rapidapi-key': '257f287c8amshaf7086cb3d81d38p1b8ea2jsna4d822103554',
        'x-rapidapi-host': 'themealdb.p.rapidapi.com'
      }
    })
    res.json(response.data);
  }catch(error){
    res.status(500).json({error: 'An error occurred'});
  }
});


// API endpoint to get the search recipes
app.get('/api/search_recipes',async (req, res) => {
  try{
    // Get the name parameter from the query string
    const {name} = req.query;
    // Check if the name parameter is missing
    if(!name){
      return res.status(400).json({error: 'Missing required parameter'});
    }
    const response = await axios.get('https://themealdb.p.rapidapi.com/search.php', {
      headers: {
        'x-rapidapi-key': '257f287c8amshaf7086cb3d81d38p1b8ea2jsna4d822103554',
        'x-rapidapi-host': 'themealdb.p.rapidapi.com'
      },
      params: {
        s: name
      }
    })
    res.json(response.data);
  }catch(error){
    res.status(500).json({error: 'An error occurred'});
  }
})

// An endpoint to handle getting all favorite restaurants from MongoDB
app.get('/api/recipe_favourites',async (req, res) => {
  // Get the UUID from the query string
  const { uuid } = req.query;
  // Check if the UUID is missing
  if (!uuid) {
    return res.status(400).json({ error: 'UUID is required' });
  }

  try{
    await connectDB();
    const recipes = await Recipe.find({ uuid });
    res.status(200).json(recipes);
  }catch(error){
    res.status(500).json({ error: 'Failed to get recipes' });
  }
});

// API to handle adding a favorite recipe to MongoDB
app.post('/api/recipe_favourite', async (req, res) => {
  // Get the required properties from the request body
  const { uuid,idMeal,strMeal, strCategory, strInstructions, strMealThumb, strIngredients } = req.body;
  try {
    // Connect to MongoDB
    await connectDB();
    if (!uuid) {
      return res.status(400).json({ error: 'UUID is required' });
    }
    // Check if recipe with the same id meal already exists
    const existingRecipe = await Recipe.findOne({ idMeal,uuid });
    if (existingRecipe) {
      return res.status(400).json({ error: 'Recipe already saved in Bookmarks' });
    }
    
    // Create a new recipe instance and pass the required properties from the request body
    const recipe = new Recipe({
      uuid,
      idMeal,
      strMeal,
      strCategory,
      strInstructions,
      strMealThumb,
      strIngredients
    });
    // Save the restaurant to MongoDB
    await recipe.save();
    res.status(200).json({ message: 'Recipe added as favorite' });

  } catch (error) {
    res.status(500).json({ error });
  }
});



// API endpoint to handle deleting a favorite recipe from MongoDB
app.delete('/api/recipe_favourite', async(req, res) => {
  const { uuid, idMeal } = req.query;
  if(!uuid){
    return res.status(400).json({ error: 'UUID is required' });
  }

  try{
    await connectDB();
    // Find the recipe by the UUID and idMeal and delete it
    const recipe = await Recipe.findOneAndDelete({ uuid, idMeal});
    if (recipe) {
      return res.status(200).json({ message: 'Recipe deleted' });
    }else{
      return res.status(404).json({ error: 'Recipe not found' });
    
    }
  }catch{
    res.status(500).json({ error: 'Failed to delete recipe' });

  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});