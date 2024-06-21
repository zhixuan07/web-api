const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3003;
const connectDB = require('../dbconn')
const Drink = require('../schema/drink');
// Use the CORS middleware
app.use(cors());

app.use(express.json());


// API endpoint to get the latest drinks
app.get('/api/latest_cocktails', async (req, res) => {
  try{
    const response = await axios.get('https://the-cocktail-db.p.rapidapi.com/popular.php', {
        headers: {
            'x-rapidapi-key': '257f287c8amshaf7086cb3d81d38p1b8ea2jsna4d822103554',
            'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
          }
    })
    res.json(response.data);
  }catch(error){
    res.status(500).json({error: 'An error occurred'});
  }
});


// API endpoint to get the search drinkss
app.get('/api/search_cocktails',async (req, res) => {
  try{
    // Get the name parameter from the query string
    const {name} = req.query;
    // Check if the name parameter is missing
    if(!name){
      return res.status(400).json({error: 'Missing required parameter'});
    }
    // Get the drinks from third party API
    const response = await axios.get('https://the-cocktail-db.p.rapidapi.com/search.php', {
      headers: {
        'x-rapidapi-key': '257f287c8amshaf7086cb3d81d38p1b8ea2jsna4d822103554',
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
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

// An API to handle getting all favourite drinks from MongoDB
app.get('/api/drink_favourites',async (req, res) => {
  // Get the UUID from the query string
  const { uuid } = req.query;
  // Check if the UUID is missing
  if (!uuid) {
    return res.status(400).json({ error: 'UUID is required' });
  }
  try{
    await connectDB();
    const drinks = await Drink.find({ uuid });
    if(!drinks.length){
      return res.status(404).json({ error: 'No favorite drinks found' });
    }else{
      res.status(200).json(drinks);
    }
    
  }catch(error){
    res.status(500).json({ error: 'Failed to get drinks' });
  }
});

// API to handle adding a favorite drinks to MongoDB
app.post('/api/drink_favourite', async (req, res) => {
  // Get the required properties from the request body
  const {uuid,idDrink,strDrink, strCategory, strInstructions, strDrinkThumb, strIngredients } = req.body;
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if drink with the same id  already exists
    const existingdrinks = await Drink.findOne({ idDrink });
    if (existingdrinks) {
      return res.status(400).json({ error: 'Drinks already saved in Bookmarks' });
    }

    // Create a new drink instance and pass the required properties from the request body
    const drink = new Drink({
      uuid,
      idDrink,
      strDrink,
      strCategory,
      strInstructions,
      strDrinkThumb,
      strIngredients
    });
    // Save the restaurant to MongoDB
    await drink.save();
    res.status(200).json({ message: 'Drink added as favorite' });

  } catch (error) {
    res.status(500).json({ error });
  }
});



// API endpoint to handle deleting a favorite drink from MongoDB
app.delete('/api/drink_favourite', async(req, res) => {
  const { uuid, idDrink } = req.query;
  if(!uuid){
    return res.status(400).json({ error: 'UUID is required' });
  }
  // Delete the restaurant from MongoDB
  try{
    await connectDB();
    const drinks = await Drink.findOneAndDelete({ uuid, idDrink});
    if (drinks) {
      return res.status(200).json({ message: 'Drink deleted' });
    }else{
      return res.status(404).json({ error: 'Drink not found' });
    
    }
  }catch{
    res.status(500).json({ error: 'Failed to delete drink' });

  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
