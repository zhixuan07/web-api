const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const Restaurant = require('../schema/restaurant')
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


app.get('/api/geocode', async (req, res) => {
  try {
    const {address} = req.query;
    const response = await axios.get('https://forward-and-reverse-geocoding.p.rapidapi.com/geocode',{
      params:{
        address: address
      },
      headers: {
        'X-RapidAPI-Key': '257f287c8amshaf7086cb3d81d38p1b8ea2jsna4d822103554',
        'X-RapidAPI-Host': 'forward-and-reverse-geocoding.p.rapidapi.com'
      }
    })
    res.json(response.data)
    console.log(response.data)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/restaurants', async (req, res) => {
  try {
    const { latitude, longitude,min_rating ,limit} = req.query;
    const response = await axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng', {
      headers: {
        'X-RapidAPI-Key': '257f287c8amshaf7086cb3d81d38p1b8ea2jsna4d822103554',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      },
      params: {
        latitude: latitude,
        longitude: longitude,
        limit: limit,
        currency: 'MYR',
        distance: '20',
        open_now: 'false',
        lunit: 'km',
        lang: 'en_US',
        min_rating: min_rating
      },
    });
    if(response.data){
      res.json(response.data);
    }else{
      res.status(404).json({message: 'No data found'});
    }

  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
// Define a route to handle adding a favorite restaurant
app.post('/api/favorites', (req, res) => {
  const { uuid, name, location, } = req.body;

  // Create a new restaurant instance
  const restaurant = new Restaurant({
      name,
      location,
      userId,
  });
  // Check if a restaurant with the same location ID already exists
  Restaurant.findOne({ location: location })
      .then((existingRestaurant) => {
          if (existingRestaurant) {
              res.status(400).json({ error: 'Restaurant already exists' });
          } else {
              // Save the restaurant to MongoDB
              restaurant.save()
                  .then(() => {
                      res.status(200).json({ message: 'Restaurant added as favorite' });
                  })
                  .catch((error) => {
                      res.status(500).json({ error: 'Failed to add restaurant as favorite' });
                  });
          }
      })
      .catch((error) => {
          res.status(500).json({ error: 'Failed to check for duplicate restaurant' });
      });
});

// Define a route to handle getting all favorite restaurants
app.get('/api/favorites', (req, res) => {
  // Find all favorite restaurants
  Restaurant.find()
      .then((restaurants) => {
          res.status(200).json(restaurants);
      })
      .catch((error) => {
          res.status(500).json({ error: 'Failed to get favorite restaurants' });
      });
});

// Define a route to handle deleting a favorite restaurant
app.delete('/api/favorites/:id', (req, res) => {
  const { location_id } = req.params;

  // Find the restaurant by ID and delete it
  Restaurant.findByIdAndDelete(location_id)
      .then(() => {
          res.status(200).json({ message: 'Restaurant deleted successfully' });
      })
      .catch((error) => {
          res.status(500).json({ error: 'Failed to delete restaurant' });
      });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
