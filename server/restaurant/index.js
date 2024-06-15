const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const Restaurant = require("../schema/restaurant");
const connectDB = require("../dbconn");
dotenv.config();
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

app.get("/api/geocode", async (req, res) => {
  try {
    const { address } = req.query;
    const response = await axios.get(
      "https://forward-and-reverse-geocoding.p.rapidapi.com/geocode",
      {
        params: {
          address: address,
        },
        headers: {
          "X-RapidAPI-Key":
            "257f287c8amshaf7086cb3d81d38p1b8ea2jsna4d822103554",
          "X-RapidAPI-Host": "forward-and-reverse-geocoding.p.rapidapi.com",
        },
      }
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/restaurants", async (req, res) => {
  try {
    const { latitude, longitude, min_rating, limit } = req.query;
    const response = await axios.get(
      "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
      {
        headers: {
          "X-RapidAPI-Key":
            "257f287c8amshaf7086cb3d81d38p1b8ea2jsna4d822103554",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
        params: {
          latitude: latitude,
          longitude: longitude,
          limit: limit,
          currency: "MYR",
          distance: "20",
          open_now: "false",
          lunit: "km",
          lang: "en_US",
          min_rating: min_rating,
        },
      }
    );
    if (response.data) {
      res.json(response.data);
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Define a route to handle adding a favorite restaurant
app.post("/api/restaurant_favorite", async (req, res) => {
  const { uuid, location_id, name, address, phone, image_url, website, rating,num_reviews} = req.body;

  try {
    // Check if a restaurant with the same location ID already exists
    await connectDB();
    const existingRestaurant = await Restaurant.findOne({ location_id });
    if (existingRestaurant) {
      return res.status(400).json({ error: "Restaurant already exists" });
    } else {
      // Create a new restaurant instance
      const restaurant = new Restaurant({
        uuid,
        location_id,
        name,
        address,
        phone,
        image_url,
        website,
        rating,
        num_reviews
      });

      // Save the restaurant to MongoDB
      await restaurant.save();
      res.status(200).json({ message: "Restaurant added as favorite" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Define a route to handle getting all favorite restaurants
app.get("/api/restaurant_favorites", async (req, res) => {
  const { uuid } = req.query;
  // Find all favorite restaurants
  if (!uuid) {
    return res.status(400).json({ error: "UUID is required" });
  }
  try {
    await connectDB();
    const restaurants = await Restaurant.find({ uuid });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Failed to get restaurants" });
  }
});

// Define a route to handle deleting a favorite restaurant
app.delete("/api/restaurant_favorite", async (req, res) => {
  const { location_id } = req.query;
  if (!location_id) {
    return res.status(400).json({ error: "Location ID is required" });
  }
  // Delete the restaurant from MongoDB
  try {
    await connectDB();
    const restaurant = await Restaurant.findOneAndDelete({ location_id });
    if (restaurant) {
      return res.status(200).json({ message: "Restaurant deleted" });
    } else {
      return res.status(404).json({ error: "Restaurant not found" });
    }
  } catch {
    res.status(500).json({ error: "Failed to delete restaurant" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
